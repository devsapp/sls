import { getCredential, reportComponent, commandParse, help } from '@serverless-devs/core';
import Base from './common/base';
import { HELP, CONTEXT_NAME, LOGS_HELP } from './constant';
import { IInputs, IProperties } from './interface';
import StdoutFormatter from './common/stdout-formatter';
import Sls from './sls';
import Logs from './logs';
import _ from 'lodash';
import logger from './common/logger';

export default class SlsCompoent extends Base {
  logger = logger;

  async create(inputs: IInputs) {
    this.logger.debug('Create sls start...');
    this.logger.debug(`inputs params: ${JSON.stringify(inputs.props)}`);

    const apts = { boolean: ['help'], alias: { help: 'h' } };
    const commandData: any = commandParse({ args: inputs.args }, apts);
    this.logger.debug(`Command data is: ${JSON.stringify(commandData)}`);
    if (commandData?.data?.help) {
      help(HELP);
      return;
    }

    const credentials = await this.getCredential(inputs.credentials, inputs.project?.access);
    reportComponent(CONTEXT_NAME, {
      uid: credentials.AccountID,
      command: 'create',
    });

    await StdoutFormatter.initStdout();

    const properties: IProperties = inputs.props;
    this.logger.debug(`Properties values: ${JSON.stringify(properties)}.`);

    const setCache = {
      serviceName: properties.serviceName,
      configPath: inputs.path?.configPath,
    };
    const sls = new Sls(properties.regionId, credentials, true, setCache); // commandData.data?.['check-put-log']
    await sls.create(properties);

    const logstores: any = _.isArray(properties.logstore) ? properties.logstore.map(({ name }) => name) : properties.logstore;
    super.__report({
      name: 'sls',
      access: inputs.project?.access,
      content: {
        region: properties.regionId,
        project: properties.project,
        logstore: logstores,
      },
    });

    this.logger.debug('Create sls success.');

    return inputs.props;
  }

  async delete(inputs: IInputs) {
    this.logger.debug('Delete sls start...');
    this.logger.debug(`inputs params: ${JSON.stringify(inputs?.props)}`);

    const apts = { boolean: ['help'], alias: { help: 'h' } };
    const commandData: any = commandParse({ args: inputs.args }, apts);
    this.logger.debug(`Command data is: ${JSON.stringify(commandData)}`);
    if (commandData?.data?.help) {
      help(HELP);
      return;
    }

    const credentials = await this.getCredential(inputs.credentials, inputs.project?.access);
    reportComponent(CONTEXT_NAME, {
      uid: credentials.AccountID,
      command: 'delete',
    });

    await StdoutFormatter.initStdout();

    const properties: IProperties = inputs.props;
    this.logger.debug(`Properties values: ${JSON.stringify(properties)}.`);

    const sls = new Sls(properties.regionId, credentials, false);
    await sls.deleteProject(properties.project);
    super.__report({
      name: 'sls',
      access: inputs.project?.access,
      content: {
        region: properties.regionId,
        project: '',
        logstore: '',
      },
    });

    this.logger.debug('Delete sls success.');
  }

  async logs(inputs: IInputs) {
    this.logger.debug(`inputs params: ${JSON.stringify(inputs.props)}, args: ${inputs.args}`);
    /**
     * region | query(functionName) | topic(serviceName) | project | logstore: 这五个参数在 fc 组件不需要指定
     * tail: 实时日志
     * start-time | end-time: 查询的时间区间，默认 20min
     *
     * search: 关键字查询（之前是 keyword，后修改为 search）
     * type: success | fail
     * request-id: 根据 request-id 过滤
     * instance-id: 根据 instance-id 过滤
     * qualifier: 查询指定版本或者别名
     * match: 匹配到的字符高亮
     */
    const apts = {
      boolean: ['tail', 'help'],
      string: ['request-id', 'search', 'instance-id', 'match', 'qualifier', 'region', 'query', 'topic', 'project', 'logstore'],
      alias: { tail: 't', 'start-time': 's', 'end-time': 'e', 'request-id': 'r', help: 'h' },
    };
    const comParse = await commandParse(inputs, apts);
    this.logger.debug(`commandParse response is: ${JSON.stringify(comParse)}`);

    // @ts-ignore
    if (comParse.data?.help) {
      reportComponent('sls', { uid: inputs.credentials?.AccountID, command: 'logs' });
      return help(LOGS_HELP);
    }

    const credentials = await this.getCredential(inputs.credentials, inputs.project?.access);
    reportComponent('sls', { uid: credentials.AccountID, command: 'logs' });

    // 参数转化处理，尤其是交互兼容处理
    const props = await Logs.getInputs(inputs.props || {}, comParse.data || {});
    this.logger.debug(`handler props is: ${JSON.stringify(props)}`);

    const logsClient = new Logs(props.regionId, credentials);
    if (props.tail) {
      await logsClient.realtime(props);
    } else {
      const historyLogs = await logsClient.history(props);
      logsClient.printLogs(historyLogs, props.match);
    }
  }

  async remove(inputs: IInputs) {
    return await this.delete(inputs);
  }

  async deploy(inputs: IInputs) {
    return await this.create(inputs);
  }

  private async getCredential(credentials, access: string) {
    if (_.isEmpty(credentials)) {
      return await getCredential(access);
    }
    return credentials;
  }
}
