import { JiraApiClient } from "../api/jira-api-client";

export class JiraSprint {
  private apiClient: JiraApiClient;
  private boardId: string;

  constructor(apiClient: JiraApiClient, boardId: string) {
    this.apiClient = apiClient;
    this.boardId = boardId;
  }

  /**
   * 현재 활성화된 스프린트 아이디 조회
   */
  async getActiveSprintId(): Promise<number> {
    const data = await this.apiClient.request<{
      values: { id: number }[];
    }>("get", `board/${this.boardId}/sprint?state=active`);

    return data.values[0]?.id;
  }
}
