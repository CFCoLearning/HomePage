import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 通过链接获取仓库的所有者和名称
 * @param url 仓库链接
 * @returns 返回仓库所有者和名称
 */
export function getRepoNameFromUrl(url: string): [string, string] | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)(?:\/|$)/);
  if (!match) {
    console.warn(`Invalid GitHub URL: ${url}`);
    return null;
  }
  return [match[1], match[2]];
}
