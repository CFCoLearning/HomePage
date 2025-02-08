"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// 表单校验规则
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

// 统一管理表单字段
const formFields = [
  { name: "id", label: "学号", placeholder: "请输入学号" },
  { name: "nickname", label: "昵称", placeholder: "请输入昵称" },
  {
    name: "github_url",
    label: "GitHub 项目链接",
    placeholder: "请输入 GitHub 项目主页链接",
  },
] as const;

export function RegisterForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { id: "", nickname: "", github_url: "" },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6"
      >
        {formFields.map(({ name, label, placeholder }) => (
          <FormField
            key={name}
            control={form.control}
            name={name as keyof z.infer<typeof FormSchema>}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input placeholder={placeholder} {...field} />
                </FormControl>
                {fieldState.error && (
                  <FormMessage className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" className="w-full">
          提交
        </Button>
      </form>
    </Form>
  );
}
