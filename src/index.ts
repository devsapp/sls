import { HLogger, ILogger, getCredential, reportComponent, commandParse, help } from '@serverless-devs/core';
import _ from 'lodash';
import { CONTEXT, HELP, CONTEXT_NAME } from './constant';
import { IInputs, IProperties } from './interface';
import Sls from './sls';

export default class SlsCompoent {
  @HLogger(CONTEXT) logger: ILogger;

  async create(inputs: IInputs) {
    // @ts-ignore
    delete inputs.Credentials;
    // @ts-ignore
    delete inputs.credentials;
    this.logger.debug('Create sls start...');
    this.logger.debug(`inputs params: ${JSON.stringify(inputs)}`);

    const apts = { boolean: ['help'], alias: { help: 'h' } };
    const commandData: any = commandParse({ args: inputs.args }, apts);
    this.logger.debug(`Command data is: ${JSON.stringify(commandData)}`);
    if (commandData.data?.help) {
      help(HELP);
      return;
    }

    const credentials = await getCredential(inputs.project.access);
    reportComponent(CONTEXT_NAME, {
      uid: credentials.AccountID,
      command: 'create',
    });

    const properties: IProperties = inputs.props;
    this.logger.debug(`Properties values: ${JSON.stringify(properties)}.`);

    const sls = new Sls(properties.regionId, credentials);
    await sls.create(properties);

    this.logger.debug('Create sls success.');

    return inputs.props;
  }

  async delete(inputs: IInputs) {
    this.logger.debug('Delete sls start...');
    this.logger.debug(`inputs params: ${JSON.stringify(inputs)}`);

    const apts = { boolean: ['help'], alias: { help: 'h' } };
    const commandData: any = commandParse({ args: inputs.args }, apts);
    this.logger.debug(`Command data is: ${JSON.stringify(commandData)}`);
    if (commandData.data?.help) {
      help(HELP);
      return;
    }

    const credentials = await getCredential(inputs.project.access);
    reportComponent(CONTEXT_NAME, {
      uid: credentials.AccountID,
      command: 'delete',
    });

    const properties: IProperties = inputs.props;
    this.logger.debug(`Properties values: ${JSON.stringify(properties)}.`);

    const sls = new Sls(properties.regionId, credentials);
    await sls.deleteProject(properties.project);

    this.logger.debug('Delete sls success.');
  }
}
