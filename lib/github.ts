import axios, { AxiosInstance } from "axios";

export interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
  throw new Error("GITHUB_TOKEN is not defined in environment variables.");
}

export class GitHubService {
  private static axiosInstance: AxiosInstance = axios.create({
    baseURL: "https://api.github.com",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  /**
   * 获取指定仓库的贡献者
   * @param owner 仓库拥有者（组织或个人）
   * @param repo 仓库名称
   * @returns 贡献者列表
   */
  static async getContributors(
    owner: string,
    repo: string
  ): Promise<Contributor[]> {
    const url = `/repos/${owner}/${repo}/contributors`;

    try {
      const response = await this.axiosInstance.get<Contributor[]>(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching contributors for ${owner}/${repo}:`, error);
      return [];
    }
  }

  /**
   * 获取指定组织的所有仓库
   * @param orgName 组织名称
   * @returns 仓库列表
   */
  static async getOrgRepositorys(orgName: string): Promise<Repository[]> {
    const url = `/orgs/${orgName}/repos`;

    try {
      const response = await this.axiosInstance.get<Repository[]>(url);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching repositories for organization ${orgName}:`,
        error
      );
      return [];
    }
  }
}
