"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Trophy,
  Book,
  Users,
  ChevronDown,
  ChevronUp,
  Percent,
} from "lucide-react";
import Background from "../(components)/background";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "谁可以参加这次 Hackathon？",
    answer: "本次 CFC Mini Hackathon 仅限 CQUT 大一同学参加。",
  },
];

export default function DetailsPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <Background>
      <div className="py-12 px-4 md:px-8 max-w-6xl mx-auto">
        <Link
          href="/hackathon"
          className="inline-flex items-center text-white/90 hover:text-green-400 transition-colors mb-8 group"
        >
          <ArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        <h1 className="text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          CFC Mini Hackathon 2025
          <span className="block mt-2 text-2xl md:text-3xl text-white/90 font-normal">
            活动详情
          </span>
        </h1>

        <div className="space-y-10">
          <section className="bg-white/15 backdrop-blur-lg rounded-2xl p-8 transition-all hover:bg-white/20 border border-white/10 hover:border-white/20">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Calendar className="mr-3 text-green-400 w-8 h-8" />
              <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                关于活动
              </span>
            </h2>
            <p className="text-lg leading-relaxed text-white/90">
              CFC Mini Hackathon 2025是一个激动人心的120小时编程活动。
              <span className="block mt-3 text-green-300">
                由CFC
                Studio组织的这次Hackathon旨在培养创造力、促进协作并推动技术创新。
              </span>
            </p>
          </section>

          <section className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 border border-white/15 shadow-lg">
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <Percent className="mr-3 text-blue-300 w-8 h-8" />
              <span className="text-blue-300">评分标准</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  percent: "40%",
                  title: "功能实现",
                  desc: "任务是否完成，功能是否正常运行。",
                },
                {
                  percent: "30%",
                  title: "代码质量",
                  desc: "代码是否清晰、可读，是否遵循最佳代码实践。",
                },
                {
                  percent: "20%",
                  title: "创新性",
                  desc: "是否有新的创意，是否解决了实际问题。",
                },
                {
                  percent: "10%",
                  title: "演示效果",
                  desc: "演示是否清晰，解释器运行是否流畅。",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-gray-900/10 rounded-xl border border-white/10"
                >
                  <span className="text-2xl font-bold text-blue-300 mr-4">
                    {item.percent}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-gray-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white/15 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <Trophy className="mr-3 text-yellow-400 w-8 h-8" />
              <span className="bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">
                丰厚奖励
              </span>
            </h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {[
                {
                  emoji: "🥇",
                  title: "一等奖",
                  color: "text-yellow-400",
                  prize: "500元人民币 或 70 美元等值数字货币",
                  desc: "为您的创意插上翱翔的翅膀！",
                },
                {
                  emoji: "🥈",
                  title: "二等奖",
                  color: "text-gray-400",
                  prize: "300元人民币 或 42 美元等值数字货币",
                  desc: "您的创新精神值得这份奖励！",
                },
                {
                  emoji: "🥉",
                  title: "三等奖",
                  color: "text-orange-400",
                  prize: "100元人民币 或 14 美元等值数字货币",
                  desc: "继续前进，您的潜力无限！",
                },
                {
                  emoji: "🌟",
                  title: "参与奖",
                  color: "text-green-400",
                  prize: "共享 100 元人民币奖金池",
                  desc: "（一、二、三等奖获得者以外）每一位参与者都是赢家！",
                },
              ].map((award, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-900/10 rounded-xl border border-white/10"
                >
                  <div className="flex items-center mb-4">
                    <span className={`text-4xl mr-3 ${award.color}`}>
                      {award.emoji}
                    </span>
                    <div>
                      <h3 className={`text-2xl font-bold ${award.color}`}>
                        {award.title}
                      </h3>
                      <p className="text-lg font-semibold text-white/95 mt-1">
                        {award.prize}
                      </p>
                    </div>
                  </div>
                  <p className="text-white/80 pl-2 border-l-4 border-green-400 italic">
                    {award.desc}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 px-4 py-3 bg-yellow-400/10 rounded-lg text-yellow-300/90 text-sm italic border border-yellow-400/20">
              注：数字货币奖励将以当日汇率计算，包括 ETH
              或其他主流数字货币（任选其一）。
            </p>
          </section>

          <section className="bg-white/15 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold mb-8 text-white">常见问题</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-white/10 pb-4">
                  <button
                    className="flex justify-between items-center w-full text-left p-4 hover:bg-white/5 rounded-xl transition-all"
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  >
                    <span className="text-xl font-medium text-white/95 pr-4">
                      {faq.question}
                    </span>
                    {openFAQ === index ? (
                      <ChevronUp className="text-green-400" />
                    ) : (
                      <ChevronDown className="text-white/60" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="pl-4 pr-8 mt-2">
                      <p className="text-white/80 leading-relaxed border-l-4 border-green-400 pl-4">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/#register"
            className="inline-block px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-600 hover:to-emerald-500 text-xl font-bold rounded-2xl transition-all transform hover:scale-105 shadow-lg hover:shadow-emerald-400/20"
          >
            🚀 Register Now
          </Link>
        </div>
      </div>
    </Background>
  );
}
