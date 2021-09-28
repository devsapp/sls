import SlsComponent from '../src/index';
import Log from '@alicloud/log';
import dotenv from 'dotenv';
import fs from "fs-extra";
import _ from 'lodash';
import * as path from 'path';
import {
  ACCESS,
  REGION,
  LOGSTORE,
  LOGSTORE_OPTION,
  LOGSTORE_2,
  setupIntegrationTestEnv,
  cleanupIntegrationTestEnv,
  genInput,
} from './test-utils';

dotenv.config({path: path.join(__dirname, '.env')});

const accountId: string = process.env.AccountID;
const accessKeyId: string = process.env.AccessKeyID;
const accessKeySecret: string =  process.env.AccessKeySecret;

const logClient = new Log({
  region: REGION,
  accessKeyId: accessKeyId,
  accessKeySecret: accessKeySecret,
});

describe('Integration::sls', () => {
  beforeAll(async () => {
    await setupIntegrationTestEnv(ACCESS, accountId, accessKeyId, accessKeySecret);
  });

  afterAll(async () => {
    await cleanupIntegrationTestEnv(ACCESS);
  });

  afterEach(async () => {
    await fs.remove(path.join(__dirname, '.s'));
  });

  it('deploy a logstore', async () => {
    const inputs = genInput();
    const sls = new SlsComponent();
    try {
      const res: any = await sls.deploy(inputs);
      expect(res).toEqual(inputs.props);

      // @ts-ignore: .
      const { ttl, shardCount } = await logClient.getLogStore(inputs.props.project, LOGSTORE);
      expect(ttl).toEqual(3600);
      expect(shardCount).toEqual(1);
    } finally {
      try {
        await logClient.deleteProject(inputs.props.project);
      } catch (e) {
        console.log(e);
      }
    }
  });

  it('create a logstore with options', async () => {
    const inputs = genInput();
    inputs.props.logstoreOption = LOGSTORE_OPTION;
    const sls = new SlsComponent();
    try {
      const res: any = await sls.create(inputs);
      expect(res).toEqual(inputs.props);

      // @ts-ignore: .
      const { ttl, shardCount } = await logClient.getLogStore(inputs.props.project, LOGSTORE);
      expect(ttl).toEqual(LOGSTORE_OPTION.ttl);
      expect(shardCount).toEqual(LOGSTORE_OPTION.shardCount);
    } finally {
      try {
        await logClient.deleteProject(inputs.props.project);
      } catch (e) {
        console.log(e);
      }
    }
  });

  it('create multiple logstore and remove', async () => {
    const inputs = genInput();
    inputs.props.logstore = LOGSTORE_2;
    const sls = new SlsComponent();
    try {
      const res: any = await sls.create(inputs);
      expect(res).toEqual(inputs.props);

      // @ts-ignore: .
      const logstoreRes1 = await logClient.getLogStore(inputs.props.project, LOGSTORE[0]);
      // @ts-ignore: .
      expect(logstoreRes1.ttl).toEqual(3600);
      // @ts-ignore: .
      expect(logstoreRes1.shardCount).toEqual(1);

      const logstoreRes2 = await logClient.getLogStore(inputs.props.project, LOGSTORE[1]);
      // @ts-ignore: .
      expect(logstoreRes2.ttl).toEqual(LOGSTORE[1].option.ttl);
      // @ts-ignore: .
      expect(logstoreRes2.shardCount).toEqual(LOGSTORE[1].option.shardCount);

      await sls.remove(inputs);
      await expect(logClient.getProject(inputs.props.project)).rejects.toThrowError(/ProjectNotExist/);
    } catch {
      try {
        await logClient.deleteProject(inputs.props.project);
      } catch (e) {
        console.log(e);
      }
    }
  });
});
