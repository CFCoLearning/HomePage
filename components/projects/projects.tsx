"use client";

import { Contributor, Repository } from "@/lib/github";
import { ProjectInfo, ProjectStatus } from "@/lib/project";
import ProjectCard from "./project-card";
import { ProjectInfos } from "@/data/projects";
import { motion } from "motion/react";

// import { useEffect, useState } from "react";

// import { BentoGrid } from "./project-grid";
// import { ProjectCard } from "./project-card";

// import { getAllProjectDocuments } from "@/lib/mdx/projects";
// import { getRepoNameFromUrl } from "@/lib/utils";
// import { OrgRepository } from "@/settings/base";

export function Projects() {
  return (
    <section className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div layout>
          {ProjectInfos.map((projectInfo, i) => (
            <ProjectCard key={i} projectInfo={projectInfo} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
