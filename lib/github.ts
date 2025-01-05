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
   * 通用的 API 请求处理函数
   * @param url 请求的相对路径
   * @param errorMessage 错误提示信息
   * @returns 请求结果或 null
   */
  private static async fetchData<T>(
    url: string,
    errorMessage: string
  ): Promise<T | null> {
    try {
      const response = await this.axiosInstance.get<T>(url);
      return response.data;
    } catch (error) {
      console.error(errorMessage, error);
      return null;
    }
  }

  /**
   * 获取指定仓库的信息
   * @param owner 仓库拥有者（组织或个人）
   * @param repo 仓库名称
   * @returns 仓库信息或 null
   */
  static async getRepository(
    owner: string,
    repo: string
  ): Promise<Repository | null> {
    const url = `/repos/${owner}/${repo}`;
    return this.fetchData<Repository>(
      url,
      `Error fetching repository ${owner}/${repo}:`
    );
  }

  /**
   * 获取指定仓库的贡献者
   * @param owner 仓库拥有者（组织或个人）
   * @param repo 仓库名称
   * @returns 贡献者列表（空数组表示没有贡献者或请求失败）
   */
  static async getContributors(
    owner: string,
    repo: string
  ): Promise<Contributor[]> {
    const url = `/repos/${owner}/${repo}/contributors`;
    const data = await this.fetchData<Contributor[]>(
      url,
      `Error fetching contributors for ${owner}/${repo}:`
    );
    return data || [];
  }

  /**
   * 获取指定组织的所有仓库
   * @param orgName 组织名称
   * @returns 仓库列表（空数组表示没有仓库或请求失败）
   */
  static async getOrgRepositorys(orgName: string): Promise<Repository[]> {
    const url = `/orgs/${orgName}/repos`;
    const data = await this.fetchData<Repository[]>(
      url,
      `Error fetching repositories for organization ${orgName}:`
    );
    return data || [];
  }
}

/**
 * 从 GitHub 仓库 URL 提取仓库名称
 * @param url GitHub 仓库的 URL
 * @returns 仓库名称或 null（无效的 URL）
 */
export function getRepoNameFromUrl(url: string): string | null {
  const regex = /https:\/\/github\.com\/(?:[^/]+)\/([^/]+)/;
  const match = url.match(regex);

  return match?.[1] || null;
}
