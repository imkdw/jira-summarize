import axios, { AxiosInstance, AxiosResponse } from "axios";

export class JiraApiClient {
  private baseUrl: string;
  private axiosInstance: AxiosInstance;

  constructor(host: string, username: string, apiToken: string) {
    const auth = this.generateAuth(username, apiToken);
    this.axiosInstance = this.createAxiosInstance(host, auth);
    this.baseUrl = host;
  }

  private generateAuth(username: string, apiToken: string): string {
    return Buffer.from(`${username}:${apiToken}`).toString("base64");
  }

  async request<T>(
    method: "get" | "post" | "put" | "delete",
    endpoint: string,
    params: Record<string, unknown> = {}
  ): Promise<T> {
    try {
      const response = await this.axiosInstance[method](`${endpoint}`, {
        params,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  private createAxiosInstance(baseUrl: string, auth: string) {
    return axios.create({
      baseURL: baseUrl,
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });
  }
}
