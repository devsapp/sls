import { ILogger } from '@serverless-devs/core';
import { IProperties, ICredentials } from './interface';
export default class Sls {
    logger: ILogger;
    logClient: any;
    checkPutLog: boolean;
    private stdoutFormatter;
    constructor(regionId: any, profile: ICredentials, checkPutLog: boolean);
    checkProjectExist(project: string): Promise<boolean>;
    checkLogStoreExist(project: string, logstore: string): Promise<boolean>;
    createProject(project: string, description: string): Promise<void>;
    createLogStore(project: string, logstore: string, createLogstoreOptions: any): Promise<void>;
    postLogStoreLogs(project: string, logstore: string, data: any): Promise<void>;
    updateLogStore(project: string, logstore: string, logstoreOptions: any): Promise<void>;
    makeLogstoreIndex(project: string, logstore: string): Promise<void>;
    makeLogstore(project: any, logstore: any, logstoreOption: any): Promise<void>;
    create({ logstore, project, description, logstoreOption }: IProperties): Promise<void>;
    deleteProject(project: string): Promise<void>;
}
