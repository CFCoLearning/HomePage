import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 从 GitHub 仓库 URL 中提取仓库名称
 * @param url GitHub 仓库的 URL
 * @returns 返回仓库名称或 null（如果 URL 无效）
 */
export function getRepoNameFromUrl(url: string): string | null {
  const regex = /https:\/\/github\.com\/(?:[^/]+)\/([^/]+)/;
  const match = url.match(regex);
  return match?.[1] || null;
}
