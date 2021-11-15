export const CONTEXT = 'SLS';
export const CONTEXT_NAME = 'sls';

export const TIME_ERROR_TIP = "The obtained time format is wrong. The time parameter can be a timestamp, or the format: 'yyyy-MM-ddTHH:mm:ssZ', such as '1623005699000', '2021-06-07T02:54:59+08:00', '2021-06-06T18:54:59Z'";

export const RETRYOPTIONS = {
  retries: 3,
  factor: 2,
  minTimeout: 1 * 1000,
  randomize: true,
};

export const HELP = [
  {
    header: 'Options',
    optionList: [
      {
        name: 'help',
        description: '使用引导',
        alias: 'h',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Examples',
    content: [
      {
        example: '$ s deploy',
      },
      {
        example: '$ s remove',
      },
    ],
  },
];

export const LOGS_HELP = [
  {
    header: 'Log',
    content: 'Log query function.',
  },
  {
    header: 'Usage',
    content: [
      { example: '$ s logs <options>' },
    ],
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'tail',
        description: 'Continuous log output mode',
        alias: 't',
        defaultOption: false,
        type: Boolean,
      },
      {
        name: 'start-time',
        description: 'Query log start time',
        alias: 's',
        defaultOption: false,
        type: Number,
      },
      {
        name: 'end-time',
        description: 'Query log end time',
        alias: 'e',
        defaultOption: false,
        type: Number,
      },
      {
        name: 'keyword',
        description: 'Keyword query',
        alias: 'k',
        defaultOption: false,
        type: String,
      },
      {
        name: 'request-id',
        description: 'Query according to requestId within the time interval',
        alias: 'r',
        defaultOption: false,
        type: String,
      },
      {
        name: 'type',
        description: 'Log type query, value: failed',
        defaultOption: false,
        type: String,
      },
      {
        name: 'topic',
        description: 'Log topic',
        defaultOption: false,
        type: String,
      },
      {
        name: 'query',
        description: 'Query and analysis statements',
        defaultOption: false,
        type: String,
      },
      {
        name: 'region',
        description: 'Pass in region in cli mode',
        defaultOption: false,
        type: String,
      },
      {
        name: 'project',
        description: 'Pass in project in cli mode',
        defaultOption: false,
        type: String,
      },
      {
        name: 'logstore',
        description: 'Pass in logstore in cli mode',
        defaultOption: false,
        type: String,
      },
    ],
  },
  {
    header: 'Global Options',
    optionList: [
      {
        name: 'help',
        description: 'Logs help for command',
        alias: 'h',
        type: Boolean,
      },
    ],
  },
  {
    header: 'Examples with Yaml',
    content: [
      {
        desc: 'Query logs in the time interval',
        example: '$ s logs -s 2021-06-07T02:54:00+08:00 -e 2021-06-07T02:54:59+08:00',
      },
      {
        desc: 'Continuous log output mode',
        example: '$ s logs -t',
      },
    ],
  },
];
