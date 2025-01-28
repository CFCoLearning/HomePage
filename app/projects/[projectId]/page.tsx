import { notFound } from "next/navigation";
import Timeline from "../(components)/time-line";
import Content from "../(components)/content";
import CheckInTable from "../(components)/checkin-table";
import { ProjectDetails } from "@/data/projects";
import * as motion from "motion/react-client";
import { Header } from "../(components)/header";
import { CheckoutGradients } from "../(components)/project-gradients";
import "@/styles/checkout.css";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await Promise.resolve(params);

  const project = ProjectDetails.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CheckoutGradients />
      <div className="w-full md:w-2/3 mx-auto pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pb-10"
        >
          <Header project={project} />
        </motion.div>
        {/* 学习内容 */}
        <div className="px-8 pb-10">
          <Content title="学习内容" content={project.content} />
        </div>
        {/* 时间安排 */}
        <div className="px-8 pb-10">
          <Timeline timeline={project.timeline} />
        </div>
        {/* 学习形式 */}
        {project.learningFormat && (
          <div className="px-8 pb-10">
            <Content title="学习形式" content={project.learningFormat} />
          </div>
        )}
        {/* 学习资料 */}
        {project.materials && (
          <div className="px-8 pb-10">
            <Content title="学习资料" content={project.materials} />
          </div>
        )}
        {/* 适合人群 */}
        {project.suitable && (
          <div className="px-8 pb-10">
            <Content title="适合人群" content={project.suitable} />
          </div>
        )}
        {/* 收获 */}
        {project.gains && (
          <div className="px-8 pb-10">
            <Content title="收获" content={project.gains} />
          </div>
        )}
        {/* 打卡 */}
        <div className="px-8 pb-10">
          {project.participants && (
            <CheckInTable participants={project.participants} />
          )}
        </div>
      </div>
    </div>
  );
}
