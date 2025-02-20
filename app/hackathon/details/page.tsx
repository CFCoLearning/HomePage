"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Trophy,
  ChevronDown,
  Percent,
  Users,
  Laptop,
  Video,
  Info,
  CheckCircle,
  Star,
  Target,
  Layers,
  GitBranch,
  HelpCircle,
} from "lucide-react";

const PAGE_DATA = {
  faqs: [
    {
      question: "谁可以参加这次 Hackathon？",
      answer:
        "本次 CFC Mini Hackathon 仅限 CQUT 大一同学参加。不限专业，只要你对编程感兴趣，都可以报名参与。",
    },
    {
      question: "如何组队参加？",
      answer: "参赛者可以自由组队，每队 1-4 人。",
    },
    {
      question: "我的编程经验不多，可以参加吗？",
      answer:
        "当然可以！这个 Hackathon 欢迎所有技能水平的参与者。这是一个学习和成长的绝佳机会。我们非常乐意提供技术支持，帮助你克服难题。",
    },
    {
      question: "比赛的具体主题是什么？",
      answer:
        "具体的比赛主题将在正式开始时公布。但你可以提前思考一些创新的想法，比如解决校园生活中的问题，或者是有趣的 Web 应用等。",
    },
    {
      question: "如何提交项目？",
      answer:
        "项目提交将通过 GitHub 进行，你在报名时需要提供项目的 Github 链接，后续也可以联系我们修改，但仓库的首次提交时间不得早于 hackathon 正式开始时间。",
    },
    {
      question: "评审的标准是什么？",
      answer:
        '评审会考虑几个方面：功能实现（40%）、代码质量（30%）、创新性（20%）和演示效果（10%）。具体的评分标准可以在本页面的"评审标准"部分查看。',
    },
    {
      question: "参加 Hackathon 是加入 CFC Studio 的必要条件吗？",
      answer:
        "不是必要条件。Hackathon 是一个很好的机会来展示你的能力和创意，但不参加也不会影响你申请加入 CFC Studio 的机会。CFC Studio 的选拔主要看重你的想法、态度和潜力。",
    },
  ],
  criteria: [
    { percent: "40%", title: "功能实现", desc: "核心功能完整实现且运行稳定" },
    { percent: "30%", title: "代码质量", desc: "遵循最佳实践，结构清晰可维护" },
    { percent: "20%", title: "创新性", desc: "解决方案具有独特性和实用性" },
    { percent: "10%", title: "演示效果", desc: "演示逻辑清晰，技术亮点突出" },
  ],
  awards: [
    {
      emoji: "🥇",
      title: "一等奖",
      prize: "150 元人民币或等值约 25 美元数字货币",
      desc: "最佳整体表现，在创新性、技术实现和演示效果上都表现卓越",
    },
    {
      emoji: "🥈",
      title: "二等奖",
      prize: "125 元人民币或等值约 20 美元数字货币",
      desc: "优秀的技术实现和创新思维，展现了出色的问题解决能力",
    },
    {
      emoji: "🥉",
      title: "三等奖",
      prize: "100 元人民币或等值约 15 美元数字货币",
      desc: "展现了良好的技术基础和创新潜力，未来可期",
    },
    {
      emoji: "🌟",
      title: "参与奖",
      prize: "共享 125 元人民币奖金池",
      desc: "认真参与并完成挑战，展现了学习和成长的决心",
    },
  ],
  schedule: [
    {
      phase: "报名阶段",
      date: "2024 年 2 月 20 日 - 2024 年 2 月 23 日",
      description: "开放在线报名，参赛者可以个人或团队形式报名参加。",
      icon: Users,
    },
    {
      phase: "线上开发阶段",
      date: "202 年 2 月 24 日 - 2024 年 3 月 7 日",
      description: "参赛者在线进行项目开发，可以使用提供的资源和导师支持。",
      icon: Laptop,
    },
    {
      phase: "线上答辩评审",
      date: "2024 年 3 月 8 日",
      description:
        "参赛团队通过在线会议平台展示他们的项目，接受评委提问和评审。",
      icon: Video,
    },
    {
      phase: "线下交流（可选）",
      date: "2024 年 3 月 9 日",
      description:
        "在花溪校区 4 教 203 举行，参赛者可以选择是否参加面对面的交流和展示环节。",
      icon: Users,
    },
  ],
};

export default function DetailsPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div className="py-8 px-4 md:px-8 max-w-4xl mx-auto space-y-8 z-10 relative overflow-y-auto">
      <Link
        href="/hackathon"
        className="inline-flex items-center text-gray-300 hover:text-emerald-400 transition-colors group"
      >
        <ArrowLeft className="mr-2 w-5 h-5 transition-transform group-hover:-translate-x-1" />
        go back
      </Link>

      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-100">
          CFC 2025 Mini Hackathon
        </h1>
      </header>

      <Section icon={Calendar} title="活动流程" iconColor="text-emerald-400">
        <div className="space-y-6">
          <div className="prose prose-invert max-w-none">
            <p>
              CFC 2025 Mini Hackathon
              是一个为期两周的线上编程活动，旨在激发同学们的创新精神和编程热情。
              活动全程采用线上形式，让参与者能够在灵活的环境中展示他们的技能和创意。
            </p>
          </div>

          <div className="space-y-4">
            {PAGE_DATA.schedule.map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 bg-gray-700/20 rounded-lg"
              >
                <div className="flex-shrink-0 p-2 bg-emerald-500/10 rounded-full">
                  <item.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-emerald-400">
                    {item.phase}
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">{item.date}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">
              活动亮点
            </h3>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-2">
              <li>全程线上参与，灵活安排时间</li>
              <li>结识志同道合的伙伴，拓展人脉网络</li>
              <li>丰厚奖金和奖品，认可你的创新成果</li>
              <li>可选的线下交流环节，深入探讨技术话题</li>
            </ul>
          </div>

          <div className="text-sm text-gray-400 italic">
            注：线下交流环节将在
            <span className="text-yellow-300 font-bold text-base bg-yellow-300/10 px-1 rounded">
              花溪校区 4 教 203
            </span>
            举行，参赛者可自由选择是否参加。我们鼓励大家积极参与，与其他参赛者和评委面对面交流，这将是一个难得的学习和networking的机会。
          </div>
        </div>
      </Section>

      <Section
        icon={Info}
        title="关于加入 CFC Studio"
        iconColor="text-blue-400"
      >
        <div className="space-y-6">
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-400 mb-3">
              如何加入 CFC Studio？
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-200">
                    参加线下交流：
                  </span>
                  <span>
                    这是加入 CFC Studio
                    的唯一途径。我们更看重你的想法和态度，而不仅仅是技术能力。
                  </span>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-200">
                    Hackathon 不是必须的：
                  </span>
                  <span>
                    参加 Hackathon
                    可以帮助你积累经验，但不参加也不影响你申请加入 CFC Studio。
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-emerald-400 mb-3">
              交流时我们看重什么？
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <h4 className="font-medium text-emerald-300 mb-2">
                  你的想法和态度
                </h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-2" />
                    创新精神：你如何看待和解决问题？
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-2" />
                    团队合作：你如何与他人共事？
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-2" />
                    学习热情：你对新知识的态度如何？
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <h4 className="font-medium text-emerald-300 mb-2">
                  你的项目经历
                </h4>
                <p className="text-gray-300 mb-2">
                  带上你的作品来交流，我们会聊聊：
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    你是如何想到这个项目的？
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    遇到了哪些挑战，如何解决的？
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    如果继续改进，你会怎么做？
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">
              参加 Hackathon 的好处
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <h4 className="font-medium text-yellow-300 mb-2">实践机会</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <Target className="w-4 h-4 text-red-400 mr-2" />
                    获得实际项目经验
                  </li>
                  <li className="flex items-center">
                    <Target className="w-4 h-4 text-red-400 mr-2" />
                    体验团队合作
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <h4 className="font-medium text-yellow-300 mb-2">交流准备</h4>
                <p className="text-gray-300">
                  即使没有获奖，Hackathon 的经历也是很好的交流话题。你可以讨论：
                </p>
                <ul className="space-y-2 text-gray-300 mt-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    项目构思过程
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    团队合作经历
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    问题解决能力
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-400 mb-3">
              如何准备加入 CFC Studio？
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h4 className="font-medium text-purple-300 mb-2">
                  准备你的故事
                </h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <Layers className="w-4 h-4 text-purple-400 mr-2" />
                    思考你为什么想加入 CFC Studio
                  </li>
                  <li className="flex items-center">
                    <Layers className="w-4 h-4 text-purple-400 mr-2" />
                    整理你的项目经历，选择 2-3 个最能代表你的项目
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h4 className="font-medium text-purple-300 mb-2">交流技巧</h4>
                <p className="text-gray-300 mb-2">
                  在交流中，尝试用 STAR 方法来介绍你的项目：
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <GitBranch className="w-4 h-4 text-purple-400 mr-2" />
                    情境（Situation）：项目背景
                  </li>
                  <li className="flex items-center">
                    <GitBranch className="w-4 h-4 text-purple-400 mr-2" />
                    任务（Task）：你的职责
                  </li>
                  <li className="flex items-center">
                    <GitBranch className="w-4 h-4 text-purple-400 mr-2" />
                    行动（Action）：你做了什么
                  </li>
                  <li className="flex items-center">
                    <GitBranch className="w-4 h-4 text-purple-400 mr-2" />
                    结果（Result）：项目成果
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section icon={Percent} title="评审标准" iconColor="text-blue-400">
        <div className="grid gap-4 md:grid-cols-2">
          {PAGE_DATA.criteria.map((item, index) => (
            <div
              key={index}
              className="flex items-start p-4 bg-gray-700/10 rounded-lg gap-4 border border-gray-700/30"
            >
              <div className="text-2xl font-bold text-blue-400">
                {item.percent}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-100">
                  {item.title}
                </h3>
                <p className="mt-1 text-gray-400 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section icon={Trophy} title="奖项设置" iconColor="text-yellow-400">
        <div className="grid gap-4 md:grid-cols-2">
          {PAGE_DATA.awards.map((award, index) => (
            <motion.div
              key={index}
              className="flex items-start p-4 bg-gray-700/10 rounded-lg gap-4 border border-gray-700/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="text-3xl">{award.emoji}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-100">
                  {award.title}
                </h3>
                <p className="text-emerald-400 font-medium mt-1">
                  {award.prize}
                </p>
                <p className="mt-2 text-sm text-gray-400 italic">
                  {award.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 px-4 py-3 bg-yellow-400/10 rounded-lg text-yellow-300 text-sm border border-yellow-400/20">
          注：数字货币奖励以发放当日汇率计算，包括 ETH
          或其他主流数字货币（任选其一）
        </div>
      </Section>

      <Section title="常见问题" icon={HelpCircle} iconColor="text-purple-400">
        <div className="space-y-3">
          {PAGE_DATA.faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-700/50 pb-3 last:border-0"
            >
              <button
                className="flex justify-between items-center w-full p-3 hover:bg-gray-700/20 rounded-lg transition-all"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                aria-expanded={openFAQ === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-gray-100 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                    openFAQ === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-400 text-sm leading-relaxed border-l-4 border-emerald-400 pl-4 mt-2 ml-4">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Section>

      <div className="text-center pt-6">
        <Link
          href="/hackathon"
          className="inline-block px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-lg font-medium rounded-xl transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-emerald-500/20"
        >
          Go to register
        </Link>
      </div>
    </div>
  );
}

interface SectionProps {
  icon?: React.ElementType;
  title: string;
  children: React.ReactNode;
  iconColor?: string;
}

function Section({ icon: Icon, title, children, iconColor }: SectionProps) {
  return (
    <section className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 transition-colors hover:border-emerald-400/30">
      <div className="flex items-center mb-4">
        {Icon && <Icon className={`mr-3 ${iconColor} w-6 h-6`} />}
        <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
      </div>
      {children}
    </section>
  );
}
