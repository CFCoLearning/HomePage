import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export type Role = "admin" | "user" | "guest";

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
    role: v.string(),
  }).index("by_address", ["address"]),
});
