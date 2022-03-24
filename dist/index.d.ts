import Base from './common/base';
import { IInputs, IProperties } from './interface';
export default class SlsCompoent extends Base {
    logger: import("@serverless-devs/core").Logger;
    create(inputs: IInputs): Promise<IProperties>;
    delete(inputs: IInputs): Promise<void>;
    logs(inputs: IInputs): Promise<void>;
    remove(inputs: IInputs): Promise<void>;
    deploy(inputs: IInputs): Promise<IProperties>;
    private getCredential;
}
