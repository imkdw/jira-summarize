// import axios, { AxiosInstance, AxiosResponse } from "axios";
// import { EnvConfig, validateEnv } from "../env";
// import {
//   CompletedIssuesSummary,
//   JiraIssue,
//   ResponseGetActiveSprints,
//   ResponseGetIssues,
//   Sprint,
//   SprintInfo,
// } from "./jira.types";

// export class JiraRestClient {
//   private baseUrl: string;
//   private auth: string;
//   private boardId: string;
//   private envConfig: EnvConfig;
//   private axiosInstance: AxiosInstance;

//   constructor() {
//     this.envConfig = validateEnv();
//     this.baseUrl = this.envConfig.JIRA_HOST;
//     this.boardId = this.envConfig.JIRA_BOARD_ID;
//     this.auth = this.generateAuth();
//     this.axiosInstance = this.createAxiosInstance();
//   }

//   private async makeRequest<T>(
//     endpoint: string,
//     params: Record<string, unknown> = {}
//   ): Promise<T> {
//     try {
//       const response: AxiosResponse = await this.axiosInstance.get(
//         `/rest/agile/1.0/${endpoint}`,
//         { params }
//       );

//       return response.data;
//     } catch (error) {
//       console.error("API 호출 실패:", error);
//       throw error;
//     }
//   }

//   async getActiveSprintId(): Promise<number> {
//     const data = await this.makeRequest<ResponseGetActiveSprints>(
//       `board/${this.boardId}/sprint?state=active`
//     );

//     return data.values[0]?.id;
//   }

//   /**
//    * 스프린트의 이슈 목록 가져오기 (모든 페이지)
//    */
//   async getCompletedIssues(sprintId: number): Promise<JiraIssue[]> {
//     const allIssues: JiraIssue[] = [];
//     let startAt = 0;
//     const maxResults = 50;
//     let hasMoreResults = true;

//     while (hasMoreResults) {
//       const data = await this.makeRequest<ResponseGetIssues>(
//         `sprint/${sprintId}/issue`,
//         {
//           startAt,
//           maxResults,
//           fields: "summary,status,assignee,priority,issuetype,created",
//         }
//       );

//       const issues: JiraIssue[] = data.issues.map((issue: JiraIssue) => ({
//         key: issue.key,
//         summary: issue.fields.summary,
//         status: issue.fields.status.name,
//         assignee: issue.fields.assignee?.displayName || "할당되지 않음",
//         priority: issue.fields.priority?.name || "없음",
//         issueType: issue.fields.issuetype.name,
//         created: new Date(issue.fields.created).toLocaleDateString("ko-KR"),
//         updated: new Date(issue.fields.updated).toLocaleDateString("ko-KR"),
//         description: issue.fields.description || "",
//       }));

//       allIssues.push(...issues);

//       hasMoreResults = startAt + maxResults < data.total;
//       startAt += maxResults;
//     }

//     const completedStatuses = ["Done", "완료"];
//     const completedIssues = allIssues.filter((issue) =>
//       completedStatuses.some((status) =>
//         issue.status.toLowerCase().includes(status.toLowerCase())
//       )
//     );

//     return completedIssues;
//   }

//   private generateAuth(): string {
//     return Buffer.from(
//       `${this.envConfig.JIRA_USERNAME}:${this.envConfig.JIRA_API_TOKEN}`
//     ).toString("base64");
//   }

//   private createAxiosInstance() {
//     return axios.create({
//       baseURL: this.baseUrl,
//       headers: {
//         Authorization: `Basic ${this.auth}`,
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       timeout: 10000,
//     });
//   }
// }
