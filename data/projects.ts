import {
  ProjectInfo,
  ProjectDetail,
  ProjectStatus,
  ParticipantStatus,
} from "@/lib/project";

export const ProjectInfos: ProjectInfo[] = [
  {
    title: "The-Missing-Semester",
    pageUrl: "/projects/The-Missing-Semester",
    githubUrl: "https://www.github.com/CFCoLearning/The-Missing-Semester",
    startDate: "2025-01-06",
    endDate: "2025-01-26",
    tags: ["计算工具", "命令行", "版本控制", "自动化", "现代工作流"],
  },
  {
    title: "FullStack-Compass",
    pageUrl: "/projects/FullStack-Compass",
    githubUrl: "https://www.github.com/CFCoLearning/FullStack-Compass",
    startDate: "2025-02-03",
    endDate: "2025-02-23",
    tags: ["前端", "SaaS", "产品设计"],
  },
];

export const ProjectDetails: ProjectDetail[] = [
  {
    id: "The-Missing-Semester",
    title: "计算机教育中缺失的一课",
    description:
      "在我们的教育体系中，即使掌握了学术领域的知识，许多人却仍然缺乏一项关键技能：如何高效地使用计算工具解决实际问题。",
    initiator: "echozyr2001",
    github_url: "https://www.github.com/CFCoLearning/The-Missing-Semester",
    status: ProjectStatus.FINISHED,
    tags: ["计算工具", "命令行", "版本控制", "现代工作流", "自动化"],
    timeline: {
      registration: {
        start: "2024-12-30",
        end: "2025-01-05",
      },
      learning: {
        start: "2025-01-06",
        end: "2025-01-26",
      },
    },
    content: ["课程概览与shell", "Shell工具和脚本", "编辑器", "数据整理"],
    participants: [
      {
        name: "echozyr2001",
        status: Array(13).fill(ParticipantStatus.COMPLETED),
      },
      {
        name: "YamKH514",
        status: Array(13).fill(ParticipantStatus.FAILED),
      },
      {
        name: "DriveFLY",
        status: Array(13).fill(ParticipantStatus.IMCOMPLETE),
      },
    ],
  },
];
