"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Trophy,
  ChevronDown,
  Percent,
} from "lucide-react";

const PAGE_DATA = {
  faqs: [
    {
      question: "谁可以参加这次 Hackathon？",
      answer: "本次 CFC Mini Hackathon 仅限 CQUT 大一同学参加。",
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
      prize: "500 元人民币或等值约 70 美元数字货币",
      desc: "卓越创新奖",
    },
    {
      emoji: "🥈",
      title: "二等奖",
      prize: "300 元人民币或等值约 42 美元数字货币",
      desc: "技术实践奖",
    },
    {
      emoji: "🥉",
      title: "三等奖",
      prize: "100 元人民币或等值约 14 美元数字货币",
      desc: "潜力新星奖",
    },
    {
      emoji: "🌟",
      title: "参与奖",
      prize: "共享 100 元人民币奖金池",
      desc: "全程完成挑战即可获得",
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
        Go Back
      </Link>

      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-100">
          CFC 2025 Mini Hackathon
        </h1>
      </header>

      <section className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 transition-colors hover:border-emerald-400/30">
        <div className="flex items-center mb-4">
          <Calendar className="mr-3 text-emerald-400 w-6 h-6" />
          <h2 className="text-xl font-semibold text-gray-100">活动流程</h2>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-emerald-400">核心阶段</h3>
            <div className="flex flex-wrap gap-2">
              {[
                {
                  date: "2.24-28",
                  label: "线上开发阶段",
                  color: "emerald",
                },
                { date: "3.1", label: "线上答辩评审", color: "blue" },
                { date: "3.2", label: "线下交流（可选）", color: "purple" },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    item.color === "emerald"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : item.color === "blue"
                        ? "bg-blue-500/10 text-blue-400"
                        : "bg-purple-500/10 text-purple-400"
                  }`}
                >
                  {item.date} {item.label}
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            全程线上参与，最终成果展示将于
            <span className="text-emerald-300 mx-1.5">花溪校区4教203</span>
            举办，参赛者可自由选择是否参加线下交流环节
          </p>
        </div>
      </section>

      <section className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 transition-colors hover:border-emerald-400/30">
        <div className="flex items-center mb-4">
          <Percent className="mr-3 text-blue-400 w-6 h-6" />
          <h2 className="text-xl font-semibold text-gray-100">评审标准</h2>
        </div>
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
      </section>

      <section className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 transition-colors hover:border-emerald-400/30">
        <div className="flex items-center mb-4">
          <Trophy className="mr-3 text-yellow-400 w-6 h-6" />
          <h2 className="text-xl font-semibold text-gray-100">奖项设置</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {PAGE_DATA.awards.map((award, index) => (
            <div
              key={index}
              className="flex items-start p-4 bg-gray-700/10 rounded-lg gap-4 border border-gray-700/30"
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
            </div>
          ))}
        </div>
        <div className="mt-4 px-4 py-3 bg-yellow-400/10 rounded-lg text-yellow-300 text-sm border border-yellow-400/20">
          注：数字货币奖励以发放当日汇率计算，包括 ETH
          或其他主流数字货币（任选其一）
        </div>
      </section>

      <section className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 transition-colors hover:border-emerald-400/30">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">常见问题</h2>
        <div className="space-y-3">
          {PAGE_DATA.faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-700/50 pb-3 last:border-0"
            >
              <button
                className="flex justify-between items-center w-full p-3 hover:bg-gray-700/20 rounded-lg transition-all"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <span className="text-gray-100 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                    openFAQ === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFAQ === index && (
                <div className="pl-4 pr-8 mt-2">
                  <p className="text-gray-400 text-sm leading-relaxed border-l-4 border-emerald-400 pl-4">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="text-center pt-6">
        <Link
          href="/#register"
          className="inline-block px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-lg font-medium rounded-xl transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-emerald-500/20"
        >
          Register Now
        </Link>
      </div>
    </div>
  );
}
