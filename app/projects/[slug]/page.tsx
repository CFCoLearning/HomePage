import { notFound } from "next/navigation";

import "@/styles/typography.css";
import { getDocument } from "@/lib/markdown";
import { Header } from "../(components)/header";
import { Typography } from "../(components)/typography";
import { RecordTable } from "../(components)/record-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Pages({ params }: PageProps) {
  const slug = (await params).slug;
  const res = await getDocument("projects", slug);

  if (!res) notFound();

  const { frontmatter, content } = res;

  return (
    <div className="min-h-screen bg-[#5dc6cd89] p-4 md:p-8">
      <div className="grid gap-4 md:grid-cols-[1fr,3fr] lg:gap-6">
        {/* Left Column */}
        <Card>
          <CardHeader>
            <CardTitle>项目名称</CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="my-6 border-l-4 border-[#5DC5CD] pl-4">
              <p className="text-gray-600">"test quote"</p>
            </blockquote>

            <div className="mt-6">
              <h2 className="mb-3 text-lg font-semibold">Tag</h2>
              <div className="flex gap-2">
                <span className="rounded-full bg-gray-100 px-4 py-1">
                  Artistic
                </span>
                <span className="rounded-full bg-gray-100 px-4 py-1">
                  Meticulous
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="space-y-4">
          <Card className="p-6">
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
            </CardHeader>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>时间安排</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-600">
                <div className="rounded-lg border border-gray-200 p-4 space-y-1">
                  <h3 className="font-medium">报名时间 (UTC+8)</h3>
                  <p>2024-12-30 ~ 2025-01-05</p>
                </div>
                <div className="rounded-lg border border-gray-200 p-4 space-y-1">
                  <h3 className="font-medium">共学时间 (UTC+8)</h3>
                  <p>2025-01-06 ~ 2025-01-26</p>
                </div>
                <div className="rounded-lg border border-gray-200 p-4 space-y-1">
                  <h3 className="font-medium">请假规则</h3>
                  <p>每周请假 5 次</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>学习内容</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-slate max-w-none">
                <a
                  href="https://missing-semester-cn.github.io/"
                  className="text-blue-600 hover:text-blue-800 no-underline"
                >
                  计算机教育中缺失的一课
                </a>

                <div className="mt-4 space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      第一周（2025-01-06 ~ 2025-01-12）：
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <a
                          href="https://missing-semester-cn.github.io/2020/course-shell/"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          课程概览与shell
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://missing-semester-cn.github.io/2020/shell-tools/"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Shell工具和脚本
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://missing-semester-cn.github.io/2020/editors/"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          编辑器
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://missing-semester-cn.github.io/2020/data-wrangling/"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          数据整理
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      第二周（2025-01-13 ~ 2025-01-19）：
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <a
                          href="https://missing-semester-cn.github.io/2020/command-line/"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          命令行环境
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://missing-semester-cn.github.io/2020/version-control/"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          版本控制
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://missing-semester-cn.github.io/2020/debugging-profiling/"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          调试及性能分析
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      第三周（2025-01-20 ~ 2025-01-26）：
                    </h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <a
                          href="https://missing-semester-cn.github.io/2020/metaprogramming/"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          元编程
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://missing-semester-cn.github.io/2020/security/"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          安全和密码学
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://missing-semester-cn.github.io/2020/potpourri/"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          大杂烩
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="p-6">
            <CardHeader>
              <CardTitle>打卡记录</CardTitle>
            </CardHeader>
            <CardContent>
              <RecordTable />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    // <div className="min-h-screen flex items-center justify-center">
    //   <div className="bg-blue-500/10 backdrop-blur-md border shadow-lg rounded-lg max-w-4xl w-full p-10">
    //     <Header
    //       title={frontmatter.title}
    //       status="In Progress"
    //       tags={frontmatter.keywords}
    //       initiator="echozyr2001"
    //     />
    //     {/* <Typography>{content}</Typography> */}
    //     {/* {content} */}
    //   </div>
    // </div>
  );
}
