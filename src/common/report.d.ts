declare namespace ServerlessDevsReport {
  export interface Sls {
    region: string;
    project: string;
    logstore?: string;
  }
  export interface ReportData {
    name: string;
    content: Sls;
  }
}