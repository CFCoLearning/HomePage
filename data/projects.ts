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
    content: `The Missing Semester 是一个由 MIT 开发的课程，旨在填补传统教育中缺失的关于计算工具的技能空白。这些工具不仅能提升学习和工作的效率，还能帮助我们更好地适应现代数字化社会。课程内容涵盖从命令行工具到版本控制、从数据管理到高效工作流等多个方面。

  核心技能包括但不限于：
  * 使用命令行工具（如 Bash）高效导航和管理系统。
  * 学习版本控制工具（如 Git）以进行团队协作和代码管理。
  * 掌握脚本编写和自动化，提高工作效率。
  * 数据处理和分析的基础技能。
  * 更安全地管理和使用密码。`,
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
