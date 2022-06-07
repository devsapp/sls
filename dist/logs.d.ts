import { ICredentials } from './interface';
interface IGetLogs {
    projectName: string;
    logStoreName: string;
    from: string | number;
    to: string | number;
    topic: string;
    query: string;
}
interface IRealtime {
    projectName: string;
    logStoreName: string;
    topic: string;
    query: string;
    search: string;
    qualifier: string;
    match: string;
}
interface IHistory extends IRealtime {
    startTime: string;
    endTime: string;
    type: 'success' | 'fail' | 'failed';
    requestId: string;
    instanceId: string;
}
interface IProps extends IHistory {
    regionId: string;
    tail: boolean;
}
export default class Logs {
    static getInputs(props: any, comParseData: any): Promise<IProps>;
    logger: import("@serverless-devs/core").Logger;
    slsClient: any;
    constructor(regionId: any, profile: ICredentials);
    /**
     * 输出日志
     * @param historyLogs
     * @param match
     */
    printLogs(historyLogs: any[], match: any): void;
    /**
     * 获取实时日志
     */
    realtime({ projectName, logStoreName, topic, query, search, qualifier, match }: IRealtime): Promise<void>;
    /**
     * 获取历史日志
     */
    history({ projectName, logStoreName, topic, query, search, type, requestId, instanceId, qualifier, startTime, endTime, }: IHistory): Promise<any[]>;
    /**
     * 生成查询语句
     */
    getSlsQuery(query: string, search: string, qualifier: string, requestId?: string, instanceId?: string): string;
    /**
     * 获取日志
     */
    getLogs(requestParams: IGetLogs, tabReplaceStr?: string): Promise<any[]>;
    /**
     * 过滤日志信息
     */
    private filterByKeywords;
}
export {};
