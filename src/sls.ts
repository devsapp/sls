import { HLogger, ILogger } from '@serverless-devs/core';
import Log from '@alicloud/log';
import { CONTEXT, RETRYOPTIONS } from './constant';
import { IProperties, ICredentials } from './interface';
import StdoutFormatter from './common/stdout-formatter';
import retry from 'promise-retry';

export default class Sls {
  @HLogger(CONTEXT) logger: ILogger;
  logClient: any;
  private stdoutFormatter = StdoutFormatter.stdoutFormatter;

  constructor(regionId, profile: ICredentials) {
    this.logClient = new Log({
      region: regionId,
      accessKeyId: profile.AccessKeyID,
      accessKeySecret: profile.AccessKeySecret,
      securityToken: profile.SecurityToken,
    });
  }

  async checkProjectExist(project: string): Promise<boolean> {
    this.logger.info(this.stdoutFormatter.check('project', project));
    let projectExist = true;

    try {
      await this.logClient.getProject(project);
    } catch (e) {
      if (e.code !== 'ProjectNotExist') {
        throw e;
      }
      projectExist = false;
    }

    this.logger.debug(`Project name(${project})${projectExist ? '' : ' does not'} exist.`);
    return projectExist;
  }

  async checkLogStoreExist(project: string, logstore: string): Promise<boolean> {
    this.logger.info(this.stdoutFormatter.check('logstore', `${project}/${logstore}`));

    let logStoreExist = true;
    try {
      await this.logClient.getLogStore(project, logstore);
    } catch (e) {
      if (e.code !== 'LogStoreNotExist') {
        throw e;
      }
      logStoreExist = false;
    }

    this.logger.debug(
      `Logstore name(${project}/${logstore})${logStoreExist ? '' : ' does not'} exist.`,
    );
    return logStoreExist;
  }

  async createProject(project: string, description: string) {
    this.logger.info(this.stdoutFormatter.create('project', project));

    await retry(async (retrying, times) => {
      try {
        await this.logClient.createProject(project, { description });
      } catch (ex) {
        const exCode = ex.code;

        if (exCode === 'Unauthorized') {
          throw ex;
        } else if (exCode === 'ProjectAlreadyExist') {
          throw new Error(
            `Sls project ${project} already exist, it may be in other region or created by other users.`,
          );
        } else {
          this.logger.debug(`Error when createProject, projectName is ${project}, error is: ${ex}`);
          this.logger.info(this.stdoutFormatter.retry('project', 'create', project, times));
          retrying(ex);
        }
      }
    }, RETRYOPTIONS);

    this.logger.debug(`Create project ${project} success.`);
  }

  async createLogStore(project: string, logstore: string) {
    this.logger.info(this.stdoutFormatter.create('logstore', logstore));

    const createLogstoreOptions = {
      ttl: 3600,
      shardCount: 1,
    };

    await retry(async (retrying, times) => {
      try {
        await this.logClient.createLogStore(project, logstore, createLogstoreOptions);
      } catch (ex) {
        this.logger.debug(
          `Error when createLogStore, projectName is ${project},, logstoreName is ${logstore}, error is: ${ex}`,
        );
        this.logger.info(this.stdoutFormatter.retry('logstore', 'create', logstore, times));
        retrying(ex);
      }
    }, RETRYOPTIONS);

    this.logger.debug(`Create logstore ${project}/${logstore} success.`);
  }

  async makeLogstoreIndex(project: string, logstore: string) {
    this.logger.info(this.stdoutFormatter.check('logstore index', `${project}/${logstore}`));
    try {
      await this.logClient.getIndexConfig(project, logstore);
      this.logger.debug('The log storage index exists and the creation process is skipped.');
      return;
    } catch (ex) {
      if (ex.code !== 'IndexConfigNotExist') {
        this.logger.debug(
          `Error when getIndexConfig, projectName is ${project}, logstoreName is ${logstore}, error is: ${ex}`,
        );
        throw ex;
      }
    }

    this.logger.info(this.stdoutFormatter.create('logstore index', `${project}/${logstore}`));

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
        });
      } catch (ex) {
        this.logger.debug(
          `Error when createIndex, projectName is ${project}, logstoreName is ${logstore}, error is: ${ex}`,
        );

        this.logger.info(this.stdoutFormatter.retry('logstore index', 'create', `${project}/${logstore}`, times));
        retrying(ex);
      }
    }, RETRYOPTIONS);

    this.logger.debug(`Create default index success for project ${project} logstore ${logstore}.`);
  }

  async create({ logstore, project, description }: IProperties) {
    const projectExist = await this.checkProjectExist(project);

    if (projectExist) {
      this.logger.debug('Sls project exists, skip the creation process.');
    } else {
      await this.createProject(project, description);
    }

    const logStoreExist = await this.checkLogStoreExist(project, logstore);
    if (logStoreExist) {
      this.logger.debug('Sls logstore exists, skip the creation process.');
    } else {
      await this.createLogStore(project, logstore);
    }

    await new Promise((r) => setTimeout(r, 2000));

    await this.makeLogstoreIndex(project, logstore);
  }

  async deleteProject(project: string) {
    const projectExist = await this.checkProjectExist(project);

    if (projectExist) {
      this.logger.info(this.stdoutFormatter.remove('project', project));
      await this.logClient.deleteProject(project);
      this.logger.debug(`Delete ${project} success.`);
    } else {
      this.logger.info(`Sls ${project} not exists, skip the delete`);
    }
  }
}
