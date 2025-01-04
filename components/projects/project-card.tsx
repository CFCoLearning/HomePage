import React from "react";
import AvatarCircles from "@/components/ui/avatar-circles";
import { Meteors } from "@/components/ui/meteors";
import ShinyButton from "@/components/ui/shiny-button";
import { ProjectStatus } from "@/lib/project";
import { Contributor } from "@/lib/github";

export interface ProjectCardProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  contributors: Contributor[];
  status: ProjectStatus;
}

export function ProjectCard({
  title,
  description,
  contributors,
  status,
}: ProjectCardProps) {
  return (
    <div className="relative w-full max-w-md mx-auto group">
      {/* Background Glow */}
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.95] rounded-full blur-2xl z-0" />

      {/* Card Content */}
      <div className="relative shadow-md bg-gray-900 border border-gray-800 px-4 py-4 h-full rounded-2xl flex flex-col justify-start items-start space-y-4 group-hover:shadow-lg group-hover:translate-y-[-4px] transition-all duration-300  overflow-hidden">
        {/* Status */}
        <div className="absolute top-3 right-3 flex items-center space-x-2 bg-gray-800 bg-opacity-80 px-3 py-2 rounded-full shadow-md z-10">
          <span className="text-sm font-bold text-white">{status}</span>
        </div>

        {/* Title, and Description */}
        <div className="flex-grow">
          <h1 className="font-bold text-xl text-white mb-2">{title}</h1>
          <p className="text-base text-slate-400">{description}</p>
        </div>

        {/* Contributors */}
        <div className="flex-grow">
          <AvatarCircles
            avatarUrls={contributors.map((contributor) => ({
              imageUrl: contributor.avatar_url,
              profileUrl: contributor.html_url,
            }))}
            numPeople={contributors.length > 5 ? contributors.length - 5 : 0}
          />
        </div>

        {/* Call-to-Action Button */}
        <div className="w-full mt-4">
          <ShinyButton className="w-full border px-4 py-2 rounded-lg border-gray-700 hover:bg-gray-700 hover:text-white">
            Explore
          </ShinyButton>
        </div>

        <Meteors number={30} />
      </div>
    </div>
  );
}
