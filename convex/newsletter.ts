import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const subscribe = mutation({
  args: {
    email: v.string(),
    lang: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("newsletter", {
      email: args.email,
      lang: args.lang,
      createdAt: Date.now(),
    });
  },
});
