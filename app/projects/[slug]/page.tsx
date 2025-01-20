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
