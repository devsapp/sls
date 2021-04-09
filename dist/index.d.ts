import { ILogger } from '@serverless-devs/core';
import { ICredentials } from './interface';
export default class SlsCompoent {
    logger: ILogger;
    getCredentials(credentials: {} | ICredentials, provider: string, accessAlias?: string): Promise<ICredentials>;
    create(inputs: any): Promise<void>;
    delete(inputs: any): Promise<void>;
}
