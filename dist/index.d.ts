import { ILogger } from '@serverless-devs/core';
import { IInputs } from './interface';
export default class SlsCompoent {
    logger: ILogger;
    create(inputs: IInputs): Promise<void>;
    delete(inputs: IInputs): Promise<void>;
}
