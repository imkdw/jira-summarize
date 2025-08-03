import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  JIRA_HOST: z.string(),
  JIRA_USERNAME: z.string(),
  JIRA_API_TOKEN: z.string(),
  JIRA_BOARD_ID: z.string(),
  JIRA_PROJECT_NAME: z.string(),
});

export type EnvConfig = z.infer<typeof envSchema>;

export function validateEnv(): EnvConfig {
  try {
    return envSchema.parse({
      JIRA_HOST: process.env.JIRA_HOST,
      JIRA_USERNAME: process.env.JIRA_USERNAME,
      JIRA_API_TOKEN: process.env.JIRA_API_TOKEN,
      JIRA_BOARD_ID: process.env.JIRA_BOARD_ID,
      JIRA_PROJECT_NAME: process.env.JIRA_PROJECT_NAME,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`환경변수 검증 실패 : ${error}`);
    }

    throw error;
  }
}
