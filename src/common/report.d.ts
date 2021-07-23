declare namespace ServerlessDevsReport {
  export interface Sls {
    region: string;
    project: string;
    logstore?: string | string[];
  }
  export interface ReportData {
    name: string;
    access: string;
    content: Sls;
  }
}
