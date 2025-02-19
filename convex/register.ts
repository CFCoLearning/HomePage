import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createRegister = mutation({
  args: {
    userId: v.string(),
    studentId: v.string(),
    nickname: v.string(),
    githubLink: v.string(),
  },
  handler: async (ctx, args) => {
    const existingRegister = await ctx.db
      .query("register")
      .withIndex("by_studentId", (q) => q.eq("userId", args.userId))
      .unique();
    if (existingRegister) {
      await ctx.db.patch(existingRegister._id, {
        nickname: args.nickname,
        githubLink: args.githubLink,
      });
      console.log(`Updated register with ID ${existingRegister._id}`);
    } else {
      const registerId = await ctx.db.insert("register", {
        userId: args.userId,
        studentId: args.studentId,
        nickname: args.nickname,
        githubLink: args.githubLink,
      });
      console.log(`Created register with ID ${registerId}`);
    }
  },
});
