import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    segment: v.string(),
    intent: v.string(),
    organizationName: v.optional(v.string()),
    organizationType: v.optional(v.string()),
    contactName: v.string(),
    email: v.string(),
    role: v.optional(v.string()),
    teamSizeOrInstitutionSize: v.optional(v.string()),
    need: v.optional(v.string()),
    urgency: v.optional(v.string()),
    message: v.optional(v.string()),
    sourcePage: v.string(),
    consent: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("leads", {
      ...args,
      status: "new",
      createdAt: Date.now(),
    });
  },
});

export const recordAssessment = mutation({
  args: {
    segment: v.string(),
    answers: v.object({
      awareness: v.number(),
      usage: v.number(),
      policy: v.number(),
      literacy: v.number(),
      readiness: v.number(),
    }),
    score: v.number(),
    recommendedOffer: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("assessmentRuns", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
