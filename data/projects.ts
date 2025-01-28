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
        status: [
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
        ],
      },
      {
        name: "YamKH514",
        status: [
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
        ],
      },
      {
        name: "DriveFLY",
        status: [
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
        ],
      },
      {
        name: "ArchSerein",
        status: [
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
        ],
      },
      {
        name: "DemoJustLuGuo",
        status: [
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
        ],
      },
      {
        name: "RisingGalaxy",
        status: [
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.FAILED,
          ParticipantStatus.NULL,
          ParticipantStatus.NULL,
          ParticipantStatus.NULL,
          ParticipantStatus.NULL,
          ParticipantStatus.NULL,
          ParticipantStatus.NULL,
          ParticipantStatus.NULL,
        ],
      },
      {
        name: "AmberHeart",
        status: [
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
        ],
      },
      {
        name: "Yinko",
        status: [
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
        ],
      },
      {
        name: "Kirov7",
        status: [
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
        ],
      },
      {
        name: "Hoshino",
        status: [
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.COMPLETED,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
          ParticipantStatus.INCOMPLETE,
        ],
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
    materials: `**Next.js 与 TailwindCSS 文档**

* [NextjsDoc](https://nextjs.org/docs): Next.js 官方文档，了解服务器端渲染、静态生成等现代前端框架功能。
* [TailwindcssDoc](https://tailwindcss.com/docs/installation/using-vite): TailwindCSS 的快速入门指南，轻松掌握实用的原子化 CSS。

**实用 UI 库**
* [shadcn](https://ui.shadcn.com/docs): 基于 TailwindCSS 的现代化 UI 组件库。
* [aceternity](https://ui.aceternity.com/components): 提供多种交互式组件，注重响应式设计。
* [magicui](https://magicui.design/docs/components/marquee): 创意十足的 UI 组件库，提供独特的效果。
* [reactbits](https://www.reactbits.dev/components/stack): 专注于小型 React 组件集合，适合简单项目。
* [devui](https://www.devui.in/components/hero): 美观实用的组件库，支持多种应用场景。
* [hyperui](https://www.hyperui.dev/): 免费的 TailwindCSS 组件库，支持快速开发。
* [cuicui](https://cuicui.day/): 现代化、优雅的 React 组件库。
* [tailusUI](https://ui.tailus.io/react/components/context-menu/): 提供丰富的 React UI 组件，助力快速开发。
* [flowbite](https://flowbite.com/docs/typography/links/): 结合 TailwindCSS 的高质量组件库。
* [heroui](https://www.heroui.com/docs/components/range-calendar): 设计精美、功能强大的 React 组件库。

**设计参考**
* [mobbin](https://mobbin.com/explore/web): 汇总优质设计案例，适合灵感来源和设计借鉴。

**设计工具**
* [figma](https://www.figma.com/): 流行的协作式界面设计工具。
* [framer](https://www.framer.com/): 支持交互式原型制作与高效设计。
* [framer 简短视频教程](https://www.youtube.com/watch?v=X7uO7g93rtg): Framer 快速入门视频教程，适合新手快速学习。

**格式化工具**
* [biomejs](https://biomejs.dev/zh-cn/): 代码格式化和检查工具，提升代码规范性。

**动画效果**
* [motion](https://motion.dev): 强大的 React 动画库，轻松实现流畅的交互效果。
* [react-spring](https://www.react-spring.dev/): 功能强大的动画库，支持基于物理的交互和流畅效果。

**低饱和配色生成**
* [grayscale.design](https://grayscale.design/): 自动生成柔和低饱和的配色方案，适合高级设计需求。

**一站式后端服务**
* [convex](https://docs.convex.dev/home): 提供实时数据库和后端逻辑处理服务。
* [sanity](https://www.sanity.io/): 灵活的内容管理平台，支持内容结构化。
* [supabase](https://supabase.com/docs): 开源 Firebase 替代方案，集成认证、数据库和文件存储功能。

**认证服务**
* [clerk](https://clerk.com/docs): 简单易用的用户认证和管理解决方案。

**ORM**
* [prisma](https://www.prisma.io/docs/getting-started/quickstart-sqlite): 功能强大的 ORM 工具，支持多种数据库操作。

**实战项目**
* [全栈社交 SaaS 应用](https://www.youtube.com/watch?v=o080tU3sd0k): 手把手教你构建一个全栈社交平台的完整教程，适合进阶学习者。

**内容处理**
* [MDX](https://mdxjs.com/docs/): 将 Markdown 与 JSX 结合的工具，可在 Markdown 中直接使用 React 组件。`,
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
