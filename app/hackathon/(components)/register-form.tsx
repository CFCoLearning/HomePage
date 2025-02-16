"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  id: z
    .string()
    .min(11, { message: "学号必须是至少 11 位数字。" })
    .regex(/^\d+$/, { message: "学号只能包含数字。" }),
  nickname: z.string().min(2, { message: "昵称至少需要 2 个字符。" }),
  github_url: z.string().regex(/^https:\/\/github\.com\/[^\/]+\/[^\/]+$/, {
    message:
      "请输入有效的 GitHub 项目主页链接（例如：https://github.com/user/repo）。",
  }),
});

const formFields = [
  {
    name: "id",
    label: "学号",
    placeholder: "请输入学号",
  },
  {
    name: "nickname",
    label: "昵称",
    placeholder: "请输入昵称",
  },
  {
    name: "github_url",
    label: "GitHub 项目链接",
    placeholder: "https://github.com/username/project",
  },
] as const;

export function RegisterForm({ onCloseAction }: { onCloseAction: () => void }) {
  const register = useMutation(api.register.createRegister);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { id: "", nickname: "", github_url: "" },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSuccess && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isSuccess && countdown === 0) {
      onCloseAction();
    }
    return () => clearTimeout(timer);
  }, [isSuccess, countdown, onCloseAction]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsSubmitting(true);
      await register({
        studentId: data.id,
        nickname: data.nickname,
        githubLink: data.github_url,
      });
      setIsSuccess(true);
      toast({
        title: "报名成功！",
        description: (
          <div className="mt-2 rounded-md bg-green-950 p-4">
            <p className="text-green-200">
              我们已经收到你的报名信息。请注意查收确认邮件，其中包含重要的活动详情。
            </p>
          </div>
        ),
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "报名失败",
        description: (
          <div className="mt-2 rounded-md bg-red-950 p-4">
            <p className="text-red-200">
              抱歉，报名过程中出现了问题。请稍后重试或联系我们的支持团队获取帮助。
            </p>
          </div>
        ),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-6">
        <CheckCircle className="w-16 h-16 text-green-500" />
        <h3 className="text-xl font-semibold text-center">报名成功！</h3>
        <p className="text-center text-muted-foreground">
          我们已经收到你的报名信息，请关注邮箱获取后续通知。
        </p>
        <p className="text-sm text-muted-foreground">
          窗口将在 {countdown} 秒后自动关闭
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="space-y-4">
          {formFields.map(({ name, label, placeholder }) => (
            <FormField
              key={name}
              control={form.control}
              name={name as keyof z.infer<typeof FormSchema>}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-white/80">{label}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={placeholder}
                      {...field}
                      className="bg-background/5 border-white/10 focus:border-green-500/50 focus:ring-green-500/20"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage className="text-red-300/80 bg-red-950/30 px-3 py-1 rounded-md text-sm">
                      {fieldState.error.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
          ))}
        </div>

        <Button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
