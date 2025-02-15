import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  register: defineTable({
    studentId: v.string(),
    nickname: v.string(),
    githubLink: v.string(),
  }).index("by_studentId", ["studentId"]),
});
