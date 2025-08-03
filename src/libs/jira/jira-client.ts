import { validateEnv } from "../../env";
import { JiraApiClient } from "./api/jira-api-client";
import { JiraBoard } from "./board/jira-board";
import { JiraIssue } from "./issue/jira-issue";
import { JiraSprint } from "./sprint/jira-sprint";
import { JiraProject } from "./project/jira-project";

class JiraClient {
  apiClient: JiraApiClient;
  sprint: JiraSprint;
  issue: JiraIssue;
  board: JiraBoard;
  project: JiraProject;

  constructor(
    apiClient: JiraApiClient,
    sprint: JiraSprint,
    issue: JiraIssue,
    board: JiraBoard,
    project: JiraProject
  ) {
    this.apiClient = apiClient;
    this.sprint = sprint;
    this.issue = issue;
    this.board = board;
    this.project = project;
  }
}

const { JIRA_API_TOKEN, JIRA_BOARD_ID, JIRA_HOST, JIRA_USERNAME } =
  validateEnv();

const apiClient = new JiraApiClient(JIRA_HOST, JIRA_USERNAME, JIRA_API_TOKEN);
const jiraSprint = new JiraSprint(apiClient, JIRA_BOARD_ID);
const jiraIssue = new JiraIssue(apiClient);
const jiraBoard = new JiraBoard(apiClient);
const jiraProject = new JiraProject(apiClient);

const jiraClient = new JiraClient(
  apiClient,
  jiraSprint,
  jiraIssue,
  jiraBoard,
  jiraProject
);

export { jiraClient };
