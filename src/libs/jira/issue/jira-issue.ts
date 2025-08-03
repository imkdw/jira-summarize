import { JiraApiClient } from "../api/jira-api-client";

export class JiraIssue {
  private apiClient: JiraApiClient;

  constructor(apiClient: JiraApiClient) {
    this.apiClient = apiClient;
  }

  getIssuesBySprintId(sprintId: number) {
    const issues = this.apiClient.request<unknown>(
      "get",
      `sprint/${sprintId}/issue`
    );

    return issues;
  }
}
