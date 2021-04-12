export interface IInputs {
  props: IProperties;
  project: {
    component: string;
    access: string;
    projectName: string;
  };
  appName: string;
  args: string;
  path: any;
}

export interface ICredentials {
  Alias: string;
  AccountID: string;
  AccessKeyID: string;
  AccessKeySecret: string;
  SecurityToken?: string;
}

export interface IProperties {
  regionId: string;
  logstore: string;
  project: string;
  description?: string;
}
