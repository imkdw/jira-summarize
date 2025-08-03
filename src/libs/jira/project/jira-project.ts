import { JiraApiClient } from "../api/jira-api-client";
import { JiraPagination } from "../jira.type";

export class JiraProject {
  private apiClient: JiraApiClient;

  constructor(apiClient: JiraApiClient) {
    this.apiClient = apiClient;
  }

  async searchProject(name: string) {
    const response = await this.apiClient.request<JiraPagination<JiraProject>>(
      "get",
      `rest/api/3/project/search?query=${name}`
    );

    return response.values[0];
  }
}
