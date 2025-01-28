"use client";

import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Users, CheckCircle2, XCircle, Circle } from "lucide-react";
import { ParticipantProgress, ParticipantStatus } from "@/lib/project";

interface CheckInTableProps {
  participants: ParticipantProgress[];
}

export default function CheckInTable({ participants }: CheckInTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="flex items-center gap-3 mb-4">
        <Users className="h-6 w-6" />
        <h2 className="font-display text-3xl font-bold">打卡记录</h2>
      </div>

      <Card className="bg-background/50 backdrop-blur-xl border-DeepCharcoal-600/60">
        <CardContent className="p-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-secondary/10">
                  <TableHead className="font-display text-lg">用户名</TableHead>
                  {Array.from(
                    { length: participants[0]?.status.length ?? 0 },
                    (_, i) => (
                      <TableHead key={i} className="text-center font-display">
                        1.{String(i + 6).padStart(2, "0")}
                      </TableHead>
                    )
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {participants.map((user, index) => (
                  <motion.tr
                    key={user.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="border-b border-secondary/10 hover:bg-secondary/5"
                  >
                    <TableCell className="font-mono">{user.name}</TableCell>
                    {user.status.map((status, i) => (
                      <TableCell key={i} className="text-center p-4">
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          {status === ParticipantStatus.COMPLETED ? (
                            <CheckCircle2 className="w-5 h-5 text-MutedSage-500 mx-auto" />
                          ) : status === ParticipantStatus.INCOMPLETE ? (
                            <Circle className="w-5 h-5 text-yellow-500 mx-auto" />
                          ) : status === ParticipantStatus.FAILED ? (
                            <XCircle className="w-5 h-5 text-SoftRosewood-500 mx-auto" />
                          ) : null}{" "}
                          {/* 如果是 NULL，就不渲染任何内容 */}
                        </motion.div>
                      </TableCell>
                    ))}
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
