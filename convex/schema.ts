import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  register: defineTable({
    userId: v.string(),
    studentId: v.string(),
    nickname: v.string(),
    githubLink: v.string(),
  }).index("by_studentId", ["userId"]),

  user: defineTable({
    address: v.string(),
    userName: v.string(),
  }).index("by_address", ["address"]),
});
