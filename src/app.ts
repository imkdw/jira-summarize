import { jiraClient } from "./libs/jira/jira-client";
import { validateEnv } from "./env";

async function init() {
  const { JIRA_PROJECT_NAME } = validateEnv();

  const project = await jiraClient.project.searchProject(JIRA_PROJECT_NAME);

  const activeSprintId = await jiraClient.sprint.getActiveSprintId();
  // const issues = await jiraClient.issue.getIssuesBySprintId(activeSprintId);

  console.log(project);
}

init();
