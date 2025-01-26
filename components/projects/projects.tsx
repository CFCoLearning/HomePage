"use client";

import ProjectCard from "./project-card";
import { ProjectInfos } from "@/data/projects";
import { motion } from "motion/react";

export function Projects() {
  return (
    <section className="mx-auto max-w-7xl relative px-[32px] flex flex-col items-center justify-between">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-8"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          Our Projects
        </h2>
        {/* <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fostering collaborative learning, driving growth through
            co-creation, knowledge sharing, and collective innovation.
          </p> */}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr max-w-4xl mx-auto">
        {ProjectInfos.map((projectInfo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <ProjectCard projectInfo={projectInfo} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
