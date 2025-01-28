"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { ProjectTimeline } from "@/lib/project";

interface TimelineProps {
  timeline: ProjectTimeline;
}

export default function Timeline({ timeline }: TimelineProps) {
  const timelineData = [
    {
      title: "报名时间",
      time: `${timeline.registration.start} ~ ${timeline.registration.end}`,
      desc: "请在截止日期前完成报名，过时不再接收报名。如有任何问题，请通过 issue、邮件或联系管理员获取帮助。",
    },
    {
      title: "共学时间",
      time: `${timeline.learning.start} ~ ${timeline.learning.end}`,
      desc: "这一阶段将深入相关知识的学习，并有机会与同伴互相启发、共同成长。请保持积极参与，充分利用共学资源。",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="flex items-center gap-3 mb-4">
        <Calendar className="h-6 w-6 text-primary" />
        <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white">
          时间安排
        </h2>
      </div>

      <Card className="bg-background/50 backdrop-blur-xl border-DeepCharcoal-600/60">
        <CardContent className="flex items-center p-4">
          <ol className="relative border-l-2 border-gray-200 dark:border-gray-700 m-4">
            {timelineData.map((period, index) => (
              <motion.div
                key={period.title}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.2 }}
                className="relative pl-6"
              >
                <li className="mb-8">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-RoyalBlue-800">
                    <Clock className="w-5 h-5 text-primary" />
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {period.title}
                  </h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {period.time}
                  </time>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {period.desc}
                  </p>
                </li>
              </motion.div>
            ))}
          </ol>
        </CardContent>
      </Card>
    </motion.div>
  );
}
