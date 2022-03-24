interface WriteCreatCache {
    accountID: string;
    region: string;
    serviceName: string;
    configPath: string;
    project?: string;
    logstore?: string;
}
export declare function writeCreatCache({ accountID, region, serviceName, configPath, project, logstore, }: WriteCreatCache): Promise<void>;
export {};
