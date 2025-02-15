import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createRegister = mutation({
  args: { studentId: v.string(), nickname: v.string(), githubLink: v.string() },
  handler: async (ctx, args) => {
    const registerId = await ctx.db.insert("register", {
      studentId: args.studentId,
      nickname: args.nickname,
      githubLink: args.githubLink,
    });
    console.log(`Created register with ID ${registerId}`);
  },
});
