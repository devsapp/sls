import { ILogger } from '@serverless-devs/core';
import { IProperties, ICredentials } from '../interface';
export default class Sls {
    logger: ILogger;
    logClient: any;
    constructor(regionId: any, profile: ICredentials);
    checkProjectExist(project: string): Promise<boolean>;
    checkLogStoreExist(project: string, logstore: string): Promise<boolean>;
    createProject(project: string, description: string): Promise<void>;
    createLogStore(project: string, logstore: string): Promise<void>;
    makeLogstoreIndex(project: string, logstore: string): Promise<void>;
    create({ logstore, project, description }: IProperties): Promise<void>;
    deleteProject(project: string): Promise<void>;
}
