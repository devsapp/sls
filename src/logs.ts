/* eslint-disable no-await-in-loop */
import { inquirer } from '@serverless-devs/core';
import { SLS } from 'aliyun-sdk';
import moment from 'moment';
import _ from 'lodash';
import { TIME_ERROR_TIP, DATE_TIME_REG } from './constant';
import { ICredentials } from './interface';
import logger from './common/logger';

interface IGetLogs {
  projectName: string;
  logStoreName: string;
  from: string | number;
  to: string | number;
  topic: string;
  query: string;
}

interface IRealtime {
  projectName: string;
  logStoreName: string;
  topic: string;
  query: string;
  search: string;
  qualifier: string;
  match: string;
}

interface IHistory extends IRealtime {
  startTime: string;
  endTime: string;
  type: 'success' | 'fail' | 'failed';
  requestId: string;
  instanceId: string;
}

interface IProps extends IHistory {
  regionId: string;
  tail: boolean;
}

const replaceAll = (string, search, replace) => string.split(search).join(replace);
const sleep = (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});
const COLOR_MAP = ['\x1B[36m', '\x1B[32m', '\x1B[33m', '\x1B[34m'];
const instanceIds = new Map();

export default class Logs {
  static async getInputs(props, comParseData): Promise<IProps> {
    const regionId = comParseData?.region || props?.regionId;
    if (_.isNil(regionId)) {
      throw new Error('region does not exist');
    }
    const project = comParseData?.project || props?.project;
    if (_.isNil(project)) {
      throw new Error('project does not exist');
    }
    let logstore = comParseData?.logstore || props?.logstore;
    if (_.isEmpty(logstore)) {
      throw new Error('logstore does not exist');
    } else if (!(_.isString(logstore) || _.isArray(logstore))) {
      throw new Error('The logstore type is wrong, only string and array are supported');
    }
    if (_.isArray(logstore)) {
      if (logstore.length === 1) {
        logstore = logstore[0].name;
      } else {
        const answers = await inquirer.prompt([{
          type: 'list',
          name: 'logstore',
          message: 'Multiple logstore names have been detected in your configuration, please select a logstore',
          choices: logstore.map((item) => item.name),
        }]);
        logstore = answers.logstore;
      }
    }

    return {
      regionId,
      projectName: project,
      logStoreName: logstore,
      topic: comParseData?.topic || props?.topic,
      query: comParseData?.query || props?.query,
      tail: comParseData?.tail,
      startTime: comParseData?.['start-time'],
      endTime: comParseData?.['end-time'],
      search: comParseData?.search || comParseData?.keyword,
      type: comParseData?.type,
      qualifier: comParseData?.qualifier,
      match: comParseData?.match,
      requestId: comParseData?.['request-id'],
      instanceId: comParseData?.['instance-id'],
    };
  }

  logger = logger;
  slsClient: any;

  constructor(regionId, profile: ICredentials) {
    this.slsClient = new SLS({
      accessKeyId: profile.AccessKeyID,
      secretAccessKey: profile.AccessKeySecret,
      securityToken: profile.SecurityToken,
      endpoint: `http://${regionId}.log.aliyuncs.com`,
      apiVersion: '2015-06-01',
      // httpOptions: {
      //   timeout: 1000  //1sec, 默认没有timeout
      // },
    });
  }

  /**
   * 输出日志
   * @param historyLogs
   * @param match
   */
  printLogs(historyLogs: any[], match) {
    let requestId = '';

    this.logger.debug(`print logs: ${JSON.stringify(historyLogs)}`);
    for (const item of historyLogs) {
      const { message: log, requestId: rid, time, extra } = item;
      if (requestId !== rid) {
        this.logger.log('\n');
        requestId = rid;
      }

      let l = log;

      const tokens = l.split(' ');
      if (tokens.length && DATE_TIME_REG.test(tokens[0])) {
        tokens[0] = `\x1B[1;32m${moment(tokens[0]).format('YYYY-MM-DD HH:mm:ss')}\x1B[0m`;
      }

      if (tokens[2] === '[silly]') {
        tokens.splice(2, 1);
      }
      l = tokens.join(' ');
      // l = _.trim(tokens.join(' '), '\n');

      l = replaceAll(l, 'Error', '\x1B[31mError\x1B[0m');
      l = replaceAll(l, 'ERROR', '\x1B[31mERROR\x1B[0m');
      l = replaceAll(l, 'error', '\x1B[31merror\x1B[0m');

      if (time) {
        l = `\x1B[2m${time}\x1B[0m ${l}`;
      }
      if (extra?.instanceID) {
        const instanceId = extra.instanceID;
        let colorIndex;
        if (instanceIds.has(instanceId)) {
          colorIndex = instanceIds.get(instanceId);
        } else {
          colorIndex = instanceIds.size % COLOR_MAP.length;
          instanceIds.set(instanceId, colorIndex);
        }
        l = `${COLOR_MAP[colorIndex]}${instanceId}\x1B[0m ${l}`;
      }

      // if (extra?.qualifier) {
      //   l = `${extra.qualifier} ${l}`;
      // }

      if (match) {
        l = replaceAll(l, match, `\x1B[43m${match}\x1B[0m`);
      }

      this.logger.log(l);
    }
  }

  /**
   * 获取实时日志
   */
  async realtime({ projectName, logStoreName, topic, query, search, qualifier, match }: IRealtime) {
    let timeStart;
    let timeEnd;
    let times = 1800;

    /**
     * 日志接口最小区间10s，查询间隔为 1s
     * 实现：将 10s 的数据全都请求回来，然后记录输出的时间戳，同一时间戳的输出，输出过的时间戳则过滤掉
     */
    const consumedTimeStamps = [];
    while (times > 0) {
      await sleep(1500);
      times -= 1;

      timeStart = moment().subtract(10, 'seconds').unix();
      timeEnd = moment().unix();
      this.logger.debug(`realtime: ${times}, start: ${timeStart}, end: ${timeEnd}`);

      const pulledlogs = await this.getLogs({
        projectName,
        logStoreName,
        topic,
        query: this.getSlsQuery(query, search, qualifier),
        from: timeStart,
        to: timeEnd,
      });

      if (_.isEmpty(pulledlogs)) {
        continue;
      }

      let showTimestamp = '';

      const notConsumedLogs = _.filter(pulledlogs, (data) => {
        const { timestamp } = data;
        if (consumedTimeStamps.includes(timestamp)) {
          return showTimestamp === timestamp;
        }

        showTimestamp = data.timestamp;
        consumedTimeStamps.push(data.timestamp);
        return true;
      });

      this.printLogs(notConsumedLogs, match);
    }
  }

  /**
   * 获取历史日志
   */
  async history({
    projectName,
    logStoreName,
    topic,
    query,
    search,
    type,
    requestId,
    instanceId,
    qualifier,
    startTime,
    endTime,
  }: IHistory) {
    let from = moment().subtract(20, 'minutes').unix();
    let to = moment().unix();
    if (startTime && endTime) {
      // 支持时间戳和其他时间格式
      startTime = /^\d+$/g.test(startTime) ? startTime : startTime;
      endTime = /^\d+$/g.test(endTime) ? endTime : endTime;

      from = new Date(startTime).getTime() / 1000;
      to = new Date(endTime).getTime() / 1000;
    } else {
      // 20 minutes ago
      this.logger.warn('By default, find logs within 20 minutes...\n');
    }
    if (_.isNaN(from) || _.isNaN(to)) {
      throw new Error(TIME_ERROR_TIP);
    }

    const logsList = await this.getLogs({
      from,
      to,
      projectName,
      logStoreName,
      topic,
      query: this.getSlsQuery(query, search, qualifier, requestId, instanceId),
    });

    return this.filterByKeywords(logsList, { type });
  }

  /**
   * 生成查询语句
   */
  getSlsQuery(query: string, search: string, qualifier: string, requestId?: string, instanceId?: string): string {
    let q = '';
    let hasValue = false;

    if (!_.isNil(query)) {
      q += query;
      hasValue = true;
    }

    if (!_.isNil(search)) {
      q = hasValue ? `${q} and ${search}` : search;
      hasValue = true;
    }

    if (!_.isNil(qualifier)) {
      q = hasValue ? `${q} and ${qualifier}` : qualifier;
      hasValue = true;
    }

    if (!_.isNil(instanceId)) {
      q = hasValue ? `${q} and ${instanceId}` : instanceId;
      hasValue = true;
    }

    if (!_.isNil(requestId)) {
      q = hasValue ? `${q} and ${requestId}` : requestId;
    }

    return q;
  }

  /**
   * 获取日志
   */
  async getLogs(requestParams: IGetLogs, tabReplaceStr = '\n') {
    this.logger.debug(`get logs params: ${JSON.stringify(requestParams)}`);
    let count;
    let xLogCount;
    let xLogProgress = 'Complete';

    let result = [];

    do {
      const response: any = await new Promise((resolve, reject) => {
        this.slsClient.getLogs(requestParams, (error, data) => {
          if (error) {
            reject(error);
          }
          resolve(data);
        });
      });
      const { body } = response;

      if (_.isEmpty(body)) {
        continue;
      }

      count = _.keys(body).length;

      xLogCount = response.headers['x-log-count'];
      xLogProgress = response.headers['x-log-progress'];

      let requestId;
      result = _.concat(result, _.values(body).map((cur) => {
        const currentMessage = cur.message || '';
        const found = currentMessage.match('(\\w{8}(-\\w{4}){3}-\\w{12}?)');

        if (!_.isEmpty(found)) {
          requestId = found[0];
        }

        // TODO: custom 不一定存在 requestId
        if (currentMessage.includes('FC Invoke Start')) {
          requestId = currentMessage.replace('FC Invoke Start RequestId: ', '');
        }

        if (requestId) {
          requestId = _.trim(requestId);
        }

        return {
          requestId,
          timestamp: cur.__time__,
          time: moment.unix(cur.__time__).format('YYYY-MM-DD H:mm:ss'),
          message: _.trim(currentMessage, '\n').replace(new RegExp(/(\r)/g), tabReplaceStr),
          extra: {
            instanceID: cur.instanceID,
            serviceName: cur.serviceName,
            functionName: cur.functionName,
            qualifier: cur.qualifier,
            versionId: cur.versionId,
          },
        };
      }, {}));
    } while (xLogCount !== count && xLogProgress !== 'Complete');

    return result;
  }

  /**
   * 过滤日志信息
   */
  private filterByKeywords(logsList = [], { type }) {
    const logsClone = _.cloneDeep(logsList);

    const queryErrorLog = type === 'failed' || type === 'fail';
    if (queryErrorLog || type === 'success') {
      const errorRequestIds: string[] = [];
      _.forEach(logsClone, (value) => {
        const curRequestId = value.requestId;
        if (!curRequestId || errorRequestIds.includes(curRequestId)) {
          return;
        }
        const curMessage = value.message;
        const isError = curMessage?.includes(' [ERROR] ') || curMessage?.includes('Error: ');
        if (isError) {
          errorRequestIds.push(curRequestId);
        }
      });
      if (queryErrorLog) {
        return _.filter(logsClone, (value) => errorRequestIds.includes(value.requestId));
      }
      return _.filter(logsClone, (value) => !errorRequestIds.includes(value.requestId));
    }

    return logsClone;
  }
}
