import * as motion from "motion/react-client";
import { BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Typography } from "../../../components/typography";
import { ParseRawMdx } from "@/lib/markdown";

interface ContentProps {
  title: string;
  content: string;
}

export default async function Content({ title, content }: ContentProps) {
  const result = await ParseRawMdx<{ title: string }>(content);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="h-6 w-6" />
        <h2 className="font-display text-3xl font-bold">{title}</h2>
      </div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-background/50 backdrop-blur-xl border-DeepCharcoal-600/60">
            <CardContent className="p-6">
              <Typography>{result.content}</Typography>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
