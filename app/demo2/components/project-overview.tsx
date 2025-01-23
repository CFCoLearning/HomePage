"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Users, Tag } from "lucide-react";

export default function ProjectOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/50"
    >
      <div className="max-w-3xl mx-auto space-y-8">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl leading-relaxed text-gray-700"
        >
          在我们的教育体系中，即使掌握了学术领域的知识，许多人却仍然缺乏一项关键技能：如何高效地使用计算工具解决实际问题。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-retro-orange/10 rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-5 w-5 text-retro-orange" />
            <h3 className="font-retro text-xl">发起人</h3>
          </div>
          <p className="text-lg text-gray-700">开源项目组</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-5 w-5 text-retro-orange" />
            <h3 className="font-retro text-xl">标签</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {["计算工具", "命令行", "版本控制", "现代工作流", "自动化"].map(
              (tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Badge className="bg-retro-peach/30 hover:bg-retro-orange/20 text-gray-700 px-4 py-2 text-lg rounded-full border border-retro-orange/20">
                    {tag}
                  </Badge>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
