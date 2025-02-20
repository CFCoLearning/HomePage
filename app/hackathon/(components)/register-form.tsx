"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useState, useCallback, useMemo } from "react";
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
import { useAppKitAccount } from "@reown/appkit/react";

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

type FormFields = z.infer<typeof FormSchema>;

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

const SuccessMessage = ({ countdown }: { countdown: number }) => (
  <div className="flex flex-col items-center justify-center space-y-4 p-6">
    <CheckCircle className="w-16 h-16 text-green-500" />
    <h3 className="text-xl font-semibold text-center">报名成功！</h3>
    <p className="text-center text-muted-foreground">
      我们已经收到你的报名信息。
    </p>
    <p className="text-sm text-muted-foreground">
      窗口将在 {countdown} 秒后自动关闭
    </p>
  </div>
);

const showErrorToast = (title: string, description: string) =>
  toast({
    title,
    description: (
      <div className="mt-2 rounded-md bg-red-950 p-4">
        <p className="text-red-200">{description}</p>
      </div>
    ),
    variant: "destructive",
  });

const showSuccessToast = () =>
  toast({
    title: "报名成功！",
    description: (
      <div className="mt-2 rounded-md bg-green-950 p-4">
        <p className="text-green-200">我们已经收到你的报名信息。</p>
      </div>
    ),
    variant: "default",
  });

export function RegisterForm({ onCloseAction }: { onCloseAction: () => void }) {
  const { address } = useAppKitAccount();
  const register = useMutation(api.register.createRegister);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const user = useQuery(api.user.getUser, address ? { address } : "skip");

  const form = useForm<FormFields>({
    resolver: zodResolver(FormSchema),
    defaultValues: { id: "", nickname: "", github_url: "" },
  });

  useEffect(() => {
    if (!isSuccess) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSuccess]);

  useEffect(() => {
    if (countdown === 0) {
      onCloseAction();
    }
  }, [countdown, onCloseAction]);

  const onSubmit = useCallback(
    async (data: FormFields) => {
      if (!user?._id) {
        showErrorToast("未找到用户ID", "无法找到对应的用户ID，请稍后再试。");
        return;
      }

      try {
        setIsSubmitting(true);
        await register({
          userId: user._id,
          studentId: data.id,
          nickname: data.nickname,
          githubLink: data.github_url,
        });
        setIsSuccess(true);
        showSuccessToast();
      } catch (error) {
        showErrorToast(
          "报名失败",
          "报名过程中出现问题，请稍后重试或联系支持团队。"
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [register, user?._id]
  );

  const formInputClasses = useMemo(
    () =>
      "bg-background/5 border-white/10 focus:border-green-500/50 focus:ring-green-500/20",
    []
  );

  if (isSuccess) return <SuccessMessage countdown={countdown} />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="space-y-4">
          {formFields.map(({ name, label, placeholder }) => (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-white/80">{label}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={placeholder}
                      {...field}
                      className={formInputClasses}
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
