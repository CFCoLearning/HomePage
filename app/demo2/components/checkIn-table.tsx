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
import { Users, Star, XCircle } from "lucide-react";

export default function CheckInTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/50"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-retro-orange/10 p-2 rounded-xl">
          <Users className="h-6 w-6 text-retro-orange" />
        </div>
        <h2 className="font-retro text-2xl text-gray-700">打卡记录</h2>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-retro-orange/20">
              <TableHead className="font-retro text-lg">用户名</TableHead>
              {Array.from({ length: 21 }, (_, i) => (
                <TableHead key={i} className="text-center font-retro">
                  1.{String(i + 6).padStart(2, "0")}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              { name: "echozyr2001", status: Array(13).fill(true) },
              {
                name: "YamKH514",
                status: [
                  true,
                  false,
                  true,
                  true,
                  true,
                  true,
                  true,
                  true,
                  false,
                  true,
                  true,
                  true,
                  true,
                ],
              },
              {
                name: "DriveFLY",
                status: [
                  true,
                  true,
                  true,
                  true,
                  true,
                  true,
                  true,
                  true,
                  true,
                  true,
                  false,
                  false,
                  false,
                ],
              },
            ].map((user, index) => (
              <motion.tr
                key={user.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="border-b border-retro-orange/10 hover:bg-retro-orange/5"
              >
                <TableCell className="font-mono">{user.name}</TableCell>
                {user.status.map((status, i) => (
                  <TableCell key={i} className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      {status ? (
                        <Star
                          className="mx-auto h-5 w-5 text-retro-orange"
                          fill="currentColor"
                        />
                      ) : (
                        <XCircle className="mx-auto h-5 w-5 text-retro-pink" />
                      )}
                    </motion.div>
                  </TableCell>
                ))}
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
