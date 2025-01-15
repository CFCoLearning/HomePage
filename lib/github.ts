"use server";

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

export interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

const API_GITHUB_TOKEN = process.env.API_GITHUB_TOKEN;
if (!API_GITHUB_TOKEN) {
  throw new Error("API_GITHUB_TOKEN is not defined in environment variables.");
}

// 创建 axios 实例，用于发送 GitHub API 请求
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer ${API_GITHUB_TOKEN}`,
    "Content-Type": "application/json",
  },
});

/**
 * 通用的 API 数据获取函数
 * @param url 请求的相对路径
 * @param errorMessage 错误日志信息
 * @returns 返回请求数据或 null
 */
async function fetchData<T>(
  url: string,
  errorMessage: string
): Promise<T | null> {
  try {
    const response = await axiosInstance.get<T>(url);
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
 * @returns 返回仓库信息或 null
 */
export async function getRepository(
  owner: string,
  repo: string
): Promise<Repository | null> {
  const url = `/repos/${owner}/${repo}`;
  return fetchData<Repository>(url, `获取仓库 ${owner}/${repo} 信息时出错:`);
}

/**
 * 获取指定仓库的贡献者列表
 * @param owner 仓库拥有者（组织或个人）
 * @param repo 仓库名称
 * @returns 返回贡献者列表（如果失败，则返回空数组）
 */
export async function getContributors(
  owner: string,
  repo: string
): Promise<Contributor[]> {
  const url = `/repos/${owner}/${repo}/contributors`;
  const data = await fetchData<Contributor[]>(
    url,
    `获取仓库 ${owner}/${repo} 的贡献者时出错:`
  );
  return data || [];
}

/**
 * 获取指定组织的所有仓库
 * @param orgName 组织名称
 * @returns 返回仓库列表（如果失败，则返回空数组）
 */
export async function getOrgRepositories(
  orgName: string
): Promise<Repository[]> {
  const url = `/orgs/${orgName}/repos`;
  const data = await fetchData<Repository[]>(
    url,
    `获取组织 ${orgName} 的仓库时出错:`
  );
  return data || [];
}

/**
 * 获取指定用户的 GitHub 信息
 * @param username GitHub 用户名
 * @returns 返回用户信息或 null
 */
export async function getGitHubUser(
  username: string
): Promise<GitHubUser | null> {
  const url = `/users/${username}`;
  return fetchData<GitHubUser>(url, `获取用户 ${username} 信息时出错:`);
}
