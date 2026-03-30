import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    org: v.optional(v.string()),
    role: v.string(),
    interests: v.array(v.string()),
    message: v.optional(v.string()),
    whatCanYouDo: v.optional(v.string()),
    whyJoin: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("submissions", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
