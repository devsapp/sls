import { HLogger, ILogger, getCredential, reportComponent, commandParse, help } from '@serverless-devs/core';
import Base from './common/base';
import { CONTEXT, HELP, CONTEXT_NAME } from './constant';
import { IInputs, IProperties } from './interface';
import StdoutFormatter from './common/stdout-formatter';
import Sls from './sls';
import _ from 'lodash';

export default class SlsCompoent extends Base {
  @HLogger(CONTEXT) logger: ILogger;

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

    const sls = new Sls(properties.regionId, credentials);
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

    const sls = new Sls(properties.regionId, credentials);
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
