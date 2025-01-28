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
  {
    id: "FullStack-Compass",
    title: "全栈开发指北",
    description:
      "加入 FullStack Compass 共学计划，解锁现代 Web 技术栈，打造属于你的全栈产品！",
    initiator: "echozyr2001",
    github_url: "https://www.github.com/CFCoLearning/FullStack-Compass",
    status: ProjectStatus.SIGN_UP,
    tags: ["SaaS", "ts", "React", "Nextjs", "Taildwindcss"],
    content: `在 FullStack Compass 共学中，我们将专注于**前端开发、SaaS 架构、产品设计**三大方向，旨在通过最新的技术栈和项目实践构建扎实的开发能力，并为未来职业发展奠定基础。

共学内容涵盖以下核心主题：

1. 前端开发
  * 掌握 TypeScript、React、Next.js 等现代前端框架，构建高效、可维护的 Web 应用。
  * 利用 Tailwind CSS 进行快速样式开发，提升 UI 设计效率和一致性。
  * 使用 MDX 实现文档驱动的内容管理，提高可维护性和可读性。
2. SaaS 架构
  * 深入理解 SaaS 业务模型，学习如何利用 Next.js 进行全栈开发（Server-side Rendering、API Routes）。
  * 结合 Shiki 进行代码高亮与文档生成，打造开发者友好的平台。
  * 了解 SaaS 应用的部署、性能优化及可扩展架构设计。
3. 产品设计
  * 通过 React Spring 和 Framer Motion 创建流畅的动画交互效果，提升用户体验。
  * 学习 Linaria 进行零运行时的 CSS-in-JS 方案，实现高效的样式管理。
  * 结合设计思维，打造美观、易用、响应式的 Web 应用界面。`,
    suitable: `* 希望系统学习 TypeScript、React、Next.js、Tailwind CSS 等现代前端技术的开发者。
* 对 SaaS 产品开发 感兴趣，想要学习如何从 0 到 1 构建和部署完整的 Web 应用。
* 计划积累项目经验，构建自己的作品集，为求职做好准备的同学。
* 乐于分享和探索新技术的学习者。`,
    gains: `* 掌握 TypeScript + React + Next.js 现代前端技术栈，具备从前端到后端的开发能力。
* 通过共学经历，丰富简历内容，增强技术面试的自信心。`,
    timeline: {
      registration: {
        start: "2025-01-27",
        end: "2025-02-02",
      },
      learning: {
        start: "2025-02-03",
        end: "2025-02-23",
      },
    },
  },
];
