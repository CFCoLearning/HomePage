"use client";

import { motion } from "framer-motion";
import { BookOpen, Star } from "lucide-react";

export default function CourseContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-retro-orange/10 p-2 rounded-xl">
          <BookOpen className="h-6 w-6 text-retro-orange" />
        </div>
        <h2 className="font-retro text-2xl text-gray-700">学习内容</h2>
      </div>

      <div className="space-y-6">
        {[
          {
            week: "第一周",
            time: "2025-01-06 ~ 2025-01-12",
            content: [
              "课程概览与shell",
              "Shell工具和脚本",
              "编辑器",
              "数据整理",
            ],
          },
          {
            week: "第二周",
            time: "2025-01-13 ~ 2025-01-19",
            content: ["命令行环境", "版本控制", "调试及性能分析"],
          },
          {
            week: "第三周",
            time: "2025-01-20 ~ 2025-01-26",
            content: ["元编程", "安全和密码学", "大杂烩"],
          },
        ].map((week, weekIndex) => (
          <motion.div
            key={week.week}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + weekIndex * 0.2 }}
            className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/50"
          >
            <h3 className="font-retro text-xl mb-2">
              {week.week}{" "}
              <span className="text-retro-orange">({week.time})</span>
            </h3>
            <ul className="space-y-3 mt-4">
              {week.content.map((item, itemIndex) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + itemIndex * 0.1 }}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <Star
                    className="h-4 w-4 text-retro-orange"
                    fill="currentColor"
                  />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
