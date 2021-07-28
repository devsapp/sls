import { ILogger } from '@serverless-devs/core';
import { ICredentials } from './interface';
interface IGetLogs {
    projectName: string;
    logStoreName: string;
    from: string | number;
    to: string | number;
    topic: string;
    query: string;
}
export default class Logs {
    static getInputs(props: any, comParseData: any): Promise<{
        regionId: any;
        projectName: any;
        logStoreName: any;
        topic: any;
        query: any;
        tail: any;
        startTime: any;
        endTime: any;
        keyword: any;
        type: any;
        requestId: any;
    }>;
    logger: ILogger;
    slsClient: any;
    constructor(regionId: any, profile: ICredentials);
    printLogs(historyLogs: any[]): void;
    /**
     * 获取实时日志
     * @param {*} projectName
     * @param {*} logStoreName
     * @param {*} topic
     * @param {*} query
     */
    realtime(projectName: string, logStoreName: string, topic: string, query: string): Promise<void>;
    /**
     * 获取历史日志
     * @param {props} projectName
     * @param {*} logStoreName
     * @param {*} from
     * @param {*} to
     * @param {*} topic
     * @param {*} query
     * @param {*} keyword 关键字过滤
     * @param {*} queryErrorLog
     * @param {*} requestId
     */
    history(props: any): Promise<any[]>;
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
