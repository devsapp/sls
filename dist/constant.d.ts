export declare const CONTEXT = "SLS";
export declare const CONTEXT_NAME = "sls";
export declare const TIME_ERROR_TIP = "The obtained time format is wrong. The time parameter can be a timestamp, or the format: 'yyyy-MM-ddTHH:mm:ssZ', such as '1623005699000', '2021-06-07T02:54:59+08:00', '2021-06-06T18:54:59Z'";
export declare const RETRYOPTIONS: {
    retries: number;
    factor: number;
    minTimeout: number;
    randomize: boolean;
};
export declare const HELP: ({
    header: string;
    optionList: {
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
    }[];
    content?: undefined;
} | {
    header: string;
    content: {
        example: string;
    }[];
    optionList?: undefined;
})[];
export declare const LOGS_HELP: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    content: {
        example: string;
    }[];
    optionList?: undefined;
} | {
    header: string;
    optionList: ({
        name: string;
        description: string;
        alias: string;
        defaultOption: boolean;
        type: BooleanConstructor;
    } | {
        name: string;
        description: string;
        alias: string;
        defaultOption: boolean;
        type: NumberConstructor;
    } | {
        name: string;
        description: string;
        alias: string;
        defaultOption: boolean;
        type: StringConstructor;
    } | {
        name: string;
        description: string;
        defaultOption: boolean;
        type: StringConstructor;
        alias?: undefined;
    })[];
    content?: undefined;
} | {
    header: string;
    optionList: {
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
    }[];
    content?: undefined;
} | {
    header: string;
    content: {
        desc: string;
        example: string;
    }[];
    optionList?: undefined;
})[];
