import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Join form submissions
  submissions: defineTable({
    name: v.string(),
    email: v.string(),
    org: v.optional(v.string()),
    role: v.string(),
    interests: v.array(v.string()),
    message: v.optional(v.string()),
    whatCanYouDo: v.optional(v.string()),
    whyJoin: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  // Workshop / contact inquiries
  contacts: defineTable({
    email: v.string(),
    message: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  // Newsletter subscriptions (mirrors Beehiiv for segmentation)
  newsletter: defineTable({
    email: v.string(),
    lang: v.string(),
    createdAt: v.number(),
  }).index("by_email", ["email"]),
});
