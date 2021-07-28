import { ILogger } from '@serverless-devs/core';
import Base from './common/base';
import { IInputs, IProperties } from './interface';
export default class SlsCompoent extends Base {
    logger: ILogger;
    create(inputs: IInputs): Promise<IProperties>;
    delete(inputs: IInputs): Promise<void>;
    logs(inputs: IInputs): Promise<any>;
    remove(inputs: IInputs): Promise<void>;
    deploy(inputs: IInputs): Promise<IProperties>;
    private getCredential;
}
