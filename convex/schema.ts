import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Legacy join form submissions
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

  // Structured institution and partner leads
  leads: defineTable({
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
    attributionSource: v.optional(v.string()),
    attributionScenario: v.optional(v.string()),
    attributionAudience: v.optional(v.string()),
    attributionOutcome: v.optional(v.string()),
    consent: v.boolean(),
    status: v.string(),
    createdAt: v.number(),
  }).index("by_email", ["email"]).index("by_segment_and_status", ["segment", "status"]),

  staffAccess: defineTable({
    email: v.string(),
    role: v.string(),
    active: v.boolean(),
    notes: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_email_and_active", ["email", "active"])
    .index("by_role_and_active", ["role", "active"]),

  assessmentRuns: defineTable({
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
    createdAt: v.number(),
  }).index("by_segment", ["segment"]),

  demoEvents: defineTable({
    sessionId: v.string(),
    eventType: v.string(),
    scenario: v.string(),
    audience: v.string(),
    lang: v.string(),
    branch: v.optional(v.string()),
    step: v.optional(v.number()),
    outcome: v.optional(v.string()),
    ctaTarget: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_eventType", ["eventType"])
    .index("by_scenario_and_eventType", ["scenario", "eventType"])
    .index("by_audience_and_eventType", ["audience", "eventType"]),

  contentDownloads: defineTable({
    email: v.optional(v.string()),
    segment: v.string(),
    resourceKey: v.string(),
    createdAt: v.number(),
  }).index("by_segment", ["segment"]),

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
