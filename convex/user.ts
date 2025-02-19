import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const autoCreateUser = mutation({
  args: { address: v.string() },
  handler: async (ctx, args) => {
    const normalizedAddress = args.address.toLowerCase();
    const existingUser = await ctx.db
      .query("user")
      .withIndex("by_address", (q) => q.eq("address", normalizedAddress))
      .unique();
    if (existingUser) {
      console.log("User already exists");
    } else {
      const userId = await ctx.db.insert("user", {
        address: normalizedAddress,
        userName: `CrazyFor_${args.address.slice(-6)}`,
      });
      console.log(`Created user with ID ${userId}`);
    }
  },
});
