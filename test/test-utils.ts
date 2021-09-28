import { setKnownCredential } from '@serverless-devs/core';
import { IInputs } from "../src/interface";
import * as path from 'path';
import yaml from 'js-yaml';
import fs from "fs-extra";
import os from 'os';

export const ACCESS = `access-${new Date().getTime()}-${Math.random().toString(36).substr(2)}`;
export const REGION = 'cn-shenzhen';
export const PROJECT_NAME = () => `sls-component-${new Date().getTime()}-${Math.random().toString(36).substr(2)}`;
export const LOGSTORE = 'sls-test';
export const LOGSTORE_OPTION = {
  ttl: 333,
  shardCount: 2,
};
export const LOGSTORE_2 = [
  {
    name: 'sls-test',
  },
  {
    name: 'sls-test-2',
    option: LOGSTORE_OPTION,
  },
];

export const MOCK_PROJECT_YAML_PATH = path.join(__dirname, 's.yaml');

export async function setupIntegrationTestEnv(access: string, accoundId: string, accessKeyId: string, accessKetSecret: string) {
  await setKnownCredential({
    AccountID: accoundId,
    AccessKeyID: accessKeyId,
    AccessKeySecret: accessKetSecret,
  }, access);
}

export async function cleanupIntegrationTestEnv(access: string) {
  const accessFile = path.join(os.homedir(), '.s', 'access.yaml');
  const accessFileInfo = yaml.load(fs.readFileSync(accessFile, 'utf8') || '{}');
  if (accessFileInfo[access]) {
    delete accessFileInfo[access];
    fs.writeFileSync(accessFile, Object.keys(accessFileInfo).length > 0 ? yaml.dump(accessFileInfo) : '');
  }
  await fs.remove(path.join(__dirname, '.s'));
}

export function genInput(): IInputs {
  return {
    appName: 'fc-deploy-test',
    project: {
      access: ACCESS,
      component: process.cwd(),
      projectName: 'test',
    },
    path: {
      configPath: MOCK_PROJECT_YAML_PATH,
    },
    args: '-y',
    props: {
      regionId: REGION,
      project: PROJECT_NAME(),
      logstore: LOGSTORE,
    },
  };
}
