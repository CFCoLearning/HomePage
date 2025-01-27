import { notFound } from "next/navigation";
import {
  SpotlightPattern,
  GridPattern,
  GlowPattern,
} from "../(components)/patterns";
import Timeline from "../(components)/time-line";
import CourseContent from "../(components)/curse-content";
import CheckInTable from "../(components)/checkin-table";
import { Button } from "@/components/ui/button";
import { ProjectDetails } from "@/data/projects";
import * as motion from "motion/react-client";
import { Header } from "../(components)/header";
// import { projects } from "@/data/projects";

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
    <div className="min-h-screen bg-muted/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <Header project={project} />
      </motion.div>
      {/* 学习内容 */}
      {/* 时间安排 */}
      {/* 学习形式 */}
      {/* 学习资料 */}
      {/* 适合人群 */}
      {/* 收获 */}
      {/* 打卡 */}

      <div className="p-8 pb-24">
        {project.participants && (
          <CheckInTable participants={project.participants} />
        )}
      </div>

      {/* <div className="relative">
        <div className="absolute inset-0 bg-surface skew-y-3 -z-10" />
        <div className="relative bg-surface py-32 -skew-y-3">
          <div className="max-w-7xl mx-auto px-6 skew-y-3">
            <section className="mb-32">
              <div className="grid lg:grid-cols-2 gap-16">
                <div id="timeline">
                  <Timeline timeline={project.timeline} />
                </div>
                <div id="content" className="lg:mt-32">
                  <CourseContent content={project.content} />
                </div>
              </div>
            </section>

            <section id="checkin">
              {project.participants && (
                <CheckInTable participants={project.participants} />
              )}
            </section>
          </div>
        </div>
      </div> */}
    </div>
  );
}
