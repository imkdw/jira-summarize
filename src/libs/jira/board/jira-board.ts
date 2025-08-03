import { JiraApiClient } from "../api/jira-api-client";
import { JiraPagination } from "../jira.type";

export class JiraBoard {
  private apiClient: JiraApiClient;

  constructor(apiClient: JiraApiClient) {
    this.apiClient = apiClient;
  }

  async getAllBoards() {
    const response = await this.apiClient.request<JiraPagination<JiraBoard>>(
      "get",
      "board"
    );

    return response;
  }
}
