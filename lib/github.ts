import axios from "axios";

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
}

export class GitHubService {
  private static baseURL = "https://api.github.com";

  static async getContributors(
    owner: string,
    repo: string
  ): Promise<Contributor[]> {
    const url = `${this.baseURL}/repos/${owner}/${repo}/contributors`;
    const response = await axios.get<Contributor[]>(url);
    return response.data;
  }

  static async getOrgRepositorys(orgName: string): Promise<Repository[]> {
    const url = `${this.baseURL}/orgs/${orgName}/repos`;
    const response = await axios.get<Repository[]>(url);
    return response.data;
  }
}
