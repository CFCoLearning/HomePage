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
  // {
  //   question: "我应该带什么参加 Hackathon？",
  //   answer:
  //     "请带上您的笔记本电脑、充电器以及开发可能需要的任何其他设备。我们将提供食物、饮料和舒适的编程空间。",
  // },
  // 可以根据需要添加更多常见问题
];

export default function DetailsPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <Background>
      <div className="py-12">
        <Link
          href="/"
          className="inline-flex items-center text-white hover:text-green-300 transition-colors mb-8"
        >
          <ArrowLeft className="mr-2" />
          Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">
          CFC Mini Hackathon 2025：活动详情
        </h1>

        <div className="space-y-8">
          <section className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Calendar className="mr-2 text-green-400" />
              关于活动
            </h2>
            <p className="text-lg">
              CFC Mini Hackathon 2025是一个激动人心的 120 小时编程活动。 由 CFC
              Studio 组织的这次 Hackathon
              旨在培养创造力、促进协作并推动技术创新。
            </p>
          </section>

          <section className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Percent className="mr-2 text-indigo-400" />
              评分标准
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-indigo-400 mr-2 font-bold">40%</span>
                <div>
                  <p className="font-semibold">功能实现</p>
                  <p className="text-sm text-white/70">
                    任务是否完成，功能是否正常运行。
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-2 font-bold">30%</span>
                <div>
                  <p className="font-semibold">代码质量</p>
                  <p className="text-sm text-white/70">
                    代码是否清晰、可读，是否遵循 Rust 的最佳实践。
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-2 font-bold">20%</span>
                <div>
                  <p className="font-semibold">创新性</p>
                  <p className="text-sm text-white/70">
                    是否有新的功能或思路，是否展示了对 Lisp 的深刻理解。
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-2 font-bold">10%</span>
                <div>
                  <p className="font-semibold">演示效果</p>
                  <p className="text-sm text-white/70">
                    演示是否清晰，解释器运行是否流畅。
                  </p>
                </div>
              </li>
            </ul>
          </section>

          <section className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Trophy className="mr-2 text-yellow-400" />
              丰厚奖励
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2 font-bold text-xl">
                  🥇 一等奖
                </span>
                <div>
                  <p className="font-semibold">
                    500元人民币 或 70 美元等值数字货币
                  </p>
                  <p className="text-sm text-white/70">
                    为您的创意插上翱翔的翅膀！
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2 font-bold text-xl">
                  🥈 二等奖
                </span>
                <div>
                  <p className="font-semibold">
                    300元人民币 或 42 美元等值数字货币
                  </p>
                  <p className="text-sm text-white/70">
                    您的创新精神值得这份奖励！
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-orange-400 mr-2 font-bold text-xl">
                  🥉 三等奖
                </span>
                <div>
                  <p className="font-semibold">
                    100元人民币 或 14 美元等值数字货币
                  </p>
                  <p className="text-sm text-white/70">
                    继续前进，您的潜力无限！
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 font-bold text-xl">
                  🌟 参与奖
                </span>
                <div>
                  <p className="font-semibold">共享 100 元人民币奖金池</p>
                  <p className="text-sm text-white/70">
                    （一、二、三等奖获得者以外）每一位参与者都是赢家！
                  </p>
                </div>
              </li>
            </ul>
            <p className="mt-4 text-sm text-white/80 italic">
              注：数字货币奖励将以当日汇率计算，包括 ETH
              或其他主流数字货币（任选其一）。
            </p>
          </section>

          <section className="bg-white/10 backdrop-blur-md rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Users className="mr-2 text-purple-400" />
              规则和指南
            </h2>
            <ul className="space-y-2">
              <li>报名者须由 1-4 名成员组成</li>
              <li>所有代码必须在 Hackathon 期间编写</li>
              <li>允许使用开源库和API</li>
              <li>项目必须原创并解决实际问题</li>
              <li>尊重知识产权</li>
            </ul>
          </section>
        </div>

        <section className="mt-12 bg-white/10 backdrop-blur-md rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">常见问题</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/20 pb-4">
                <button
                  className="flex justify-between items-center w-full text-left text-white hover:text-green-300 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  {openFAQ === index ? <ChevronUp /> : <ChevronDown />}
                </button>
                {openFAQ === index && (
                  <p className="mt-2 text-white/80">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 text-center">
          <Link
            href="/#register"
            className="inline-block px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors"
          >
            Register Now
          </Link>
        </div>
      </div>
    </Background>
  );
}
