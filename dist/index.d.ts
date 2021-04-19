import { ILogger } from '@serverless-devs/core';
import { IInputs, IProperties } from './interface';
export default class SlsCompoent {
    logger: ILogger;
    create(inputs: IInputs): Promise<IProperties>;
    delete(inputs: IInputs): Promise<void>;
}
