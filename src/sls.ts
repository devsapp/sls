import Log from '@alicloud/log';
import _ from 'lodash';
import { RETRYOPTIONS } from './constant';
import { IProperties, ICredentials } from './interface';
import StdoutFormatter from './common/stdout-formatter';
import retry from 'promise-retry';
import logger from './common/logger';
import { writeCreatCache } from './common/write-creat-cache';

const options = {
  timeout: 60000,
};

export default class Sls {
  logClient: any;
  checkPutLog: boolean;
  regionId: string;
  accountID: string;
  serviceName: string;
  configPath: string;
  private stdoutFormatter = StdoutFormatter.stdoutFormatter;

  constructor(regionId, profile: ICredentials, checkPutLog: boolean, setCache?) {
    this.checkPutLog = checkPutLog;
    this.regionId = regionId;
    this.accountID = profile.AccountID;
    this.serviceName = setCache?.serviceName;
    this.configPath = setCache?.configPath;
    this.logClient = new Log({
      region: regionId,
      accessKeyId: profile.AccessKeyID,
      accessKeySecret: profile.AccessKeySecret,
      securityToken: profile.SecurityToken,
    });
  }

  async checkProjectExist(project: string): Promise<boolean> {
    logger.debug(this.stdoutFormatter.check('project', project));
    let projectExist = true;

    try {
      await this.logClient.getProject(project, options);
    } catch (e) {
      if (e.code !== 'ProjectNotExist') {
        throw e;
      }
      projectExist = false;
    }

    logger.debug(`Project name(${project})${projectExist ? '' : ' does not'} exist.`);
    return projectExist;
  }

  async checkLogStoreExist(project: string, logstore: string): Promise<boolean> {
    logger.debug(this.stdoutFormatter.check('logstore', `${project}/${logstore}`));

    let logStoreExist = true;
    try {
      await this.logClient.getLogStore(project, logstore, options);
    } catch (e) {
      if (e.code !== 'LogStoreNotExist') {
        throw e;
      }
      logStoreExist = false;
    }

    logger.debug(
      `Logstore name(${project}/${logstore})${logStoreExist ? '' : ' does not'} exist.`,
    );
    return logStoreExist;
  }

  async createProject(project: string, description: string) {
    await retry(async (retrying, times) => {
      try {
        await this.logClient.createProject(project, { description }, options);
      } catch (ex) {
        const exCode = ex.code;

        if (exCode === 'Unauthorized') {
          throw ex;
        } else if (exCode === 'ProjectAlreadyExist') {
          throw new Error(
            `Sls project ${project} already exist, it may be in other region or created by other users.`,
          );
        } else {
          logger.debug(`Error when createProject, projectName is ${project}, error is: ${ex}`);
          logger.debug(this.stdoutFormatter.retry('project', 'create', project, times));
          retrying(ex);
        }
      }
    }, RETRYOPTIONS);

    await writeCreatCache({
      accountID: this.accountID,
      region: this.regionId,
      serviceName: this.serviceName,
      configPath: this.configPath,
      project,
    });
    logger.debug(`Create project ${project} success.`);
  }

  async createLogStore(project: string, logstore: string, createLogstoreOptions) {
    await retry(async (retrying, times) => {
      try {
        await this.logClient.createLogStore(project, logstore, createLogstoreOptions, options);
      } catch (ex) {
        logger.debug(
          `Error when createLogStore, projectName is ${project}, logstoreName is ${logstore}, error is: ${ex}`,
        );
        logger.debug(this.stdoutFormatter.retry('logstore', 'create', logstore, times));
        retrying(ex);
      }
    }, RETRYOPTIONS);
    await writeCreatCache({
      accountID: this.accountID,
      region: this.regionId,
      serviceName: this.serviceName,
      configPath: this.configPath,
      logstore: `${project}/${logstore}`,
    });
    logger.debug(`Create logstore ${project}/${logstore} success.`);

    if (this.checkPutLog) {
      await this.postLogStoreLogs(project, logstore, {
        logs: [{
          timestamp: new Date().getTime(),
          content: {
            message: 'devs sls component create',
          },
        }],
      });
    } else {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  async postLogStoreLogs(project: string, logstore: string, data) {
    const retries = 40;

    await retry(async (retrying, times) => {
      try {
        await this.logClient.postLogStoreLogs(project, logstore, data, options);
      } catch (ex) {
        logger.debug(
          `Error when postLogStoreLogs, projectName is ${project}, logstoreName is ${logstore}, error is: ${ex}`,
        );

        if (ex.code !== 'ProjectNotExist') {
          return;
        }
        logger.debug(this.stdoutFormatter.retry('logstore', 'create', logstore, times));
        retrying(ex);
      }
    }, { retries, minTimeout: 3 * 1000, factor: 1 });
  }

  async updateLogStore(project: string, logstore: string, logstoreOptions) {
    logger.debug(this.stdoutFormatter.update('logstore', logstore));

    await retry(async (retrying, times) => {
      try {
        await this.logClient.updateLogStore(project, logstore, logstoreOptions, options);
      } catch (ex) {
        logger.debug(
          `Error when updateLogStore, projectName is ${project}, logstoreName is ${logstore}, error is: ${ex}`,
        );
        logger.debug(this.stdoutFormatter.retry('logstore', 'update', logstore, times));
        retrying(ex);
      }
    }, RETRYOPTIONS);

    logger.debug(`Update logstore ${project}/${logstore} success.`);
  }

  async makeLogstoreIndex(project: string, logstore: string) {
    logger.debug(this.stdoutFormatter.check('logstore index', `${project}/${logstore}`));
    try {
      await this.logClient.getIndexConfig(project, logstore, options);
      logger.debug('The log storage index exists and the creation process is skipped.');
      return;
    } catch (ex) {
      if (ex.code !== 'IndexConfigNotExist') {
        logger.debug(
          `Error when getIndexConfig, projectName is ${project}, logstoreName is ${logstore}, error is: ${ex}`,
        );
        throw ex;
      }
    }

    logger.debug(this.stdoutFormatter.create('logstore index', `${project}/${logstore}`));

    await retry(async (retrying, times) => {
      try {
        await this.logClient.createIndex(project, logstore, {
          ttl: 10,
          line: {
            caseSensitive: false,
            chn: false,
            // @ts-ignore
            token: [...', \'";=()[]{}?@&<>/:\n\t\r'],
          },
        }, options);
      } catch (ex) {
        logger.debug(
          `Error when createIndex, projectName is ${project}, logstoreName is ${logstore}, error is: ${ex}`,
        );
        logger.debug(this.stdoutFormatter.retry('logstore index', 'create', `${project}/${logstore}`, times));
        retrying(ex);
      }
    }, RETRYOPTIONS);

    logger.debug(`Create default index success for project ${project} logstore ${logstore}.`);
  }

  async makeLogstore(project, logstore, logstoreOption) {
    const logStoreExist = await this.checkLogStoreExist(project, logstore);
    if (logStoreExist) {
      if (!_.isEmpty(logstoreOption)) {
        await this.updateLogStore(project, logstore, logstoreOption);
      }
      logger.debug('Sls logstore exists, skip the creation process.');
    } else {
      const createLogstoreOptions = {
        ttl: logstoreOption?.ttl || 3600,
        shardCount: logstoreOption?.shardCount || 1,
      };
      await this.createLogStore(project, logstore, createLogstoreOptions);
    }

    await this.makeLogstoreIndex(project, logstore);
  }

  async create({ logstore, project, description, logstoreOption }: IProperties) {
    await logger.task('Creating', [
      {
        title: this.stdoutFormatter.create('project', project),
        id: 'project',
        task: async () => {
          const projectExist = await this.checkProjectExist(project);
          if (projectExist) {
            logger.debug('Sls project exists, skip the creation process.');
          } else {
            await this.createProject(project, description);
          }
        },
      },
      {
        title: this.stdoutFormatter.create('logstore', logstore),
        id: 'logstore',
        task: async () => {
          if (_.isArray(logstore)) {
            for (const { name, option } of logstore) {
              if (_.isNil(name)) {
                logger.debug(this.stdoutFormatter('logstore', 'not found name, skip'));
                continue;
              }
              await this.makeLogstore(project, name, _.isEmpty(option) ? logstoreOption : option);
            }
          } else if (_.isString(logstore)) {
            await this.makeLogstore(project, logstore, logstoreOption);
          } else {
            let details: string;
            if (_.isNil(logstore)) {
              details = 'Not found logstore config, skip make logstore';
            } else {
              details = 'The logstore is not string or array type, skip make logstore';
            }
            logger.debug(this.stdoutFormatter('logstore', details));
          }
        },
      },
    ]);
  }

  async deleteProject(project: string) {
    const projectExist = await this.checkProjectExist(project);

    if (projectExist) {
      logger.info(this.stdoutFormatter.remove('project', project));
      await this.logClient.deleteProject(project, options);
      logger.debug(`Delete ${project} success.`);
    } else {
      logger.info(`Sls ${project} not exists, skip the delete`);
    }
  }
}
