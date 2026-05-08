import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireStaffRole } from "./staff";

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
    attributionSource: v.optional(v.string()),
    attributionScenario: v.optional(v.string()),
    attributionAudience: v.optional(v.string()),
    attributionOutcome: v.optional(v.string()),
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

export const trackDemoEvent = mutation({
  args: {
    sessionId: v.string(),
    eventType: v.string(),
    scenario: v.string(),
    audience: v.string(),
    lang: v.string(),
    branch: v.optional(v.string()),
    step: v.optional(v.number()),
    outcome: v.optional(v.string()),
    ctaTarget: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("demoEvents", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

const bump = (bucket: Record<string, number>, key: string | undefined) => {
  const normalized = key && key.trim() ? key : "unknown";
  bucket[normalized] = (bucket[normalized] ?? 0) + 1;
};

export const getDemoInsights = query({
  args: {
    eventLimit: v.optional(v.number()),
    leadLimit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireStaffRole(ctx, ["facilitator", "admin"]);

    const eventLimit = Math.min(args.eventLimit ?? 3000, 5000);
    const leadLimit = Math.min(args.leadLimit ?? 1000, 2000);

    const events = await ctx.db.query("demoEvents").order("desc").take(eventLimit);
    const leads = await ctx.db.query("leads").order("desc").take(leadLimit);
    const demoLeads = leads.filter((lead) => lead.attributionSource === "demo_completion");

    const startsByScenario: Record<string, number> = {};
    const completionsByScenario: Record<string, number> = {};
    const completionsByAudience: Record<string, number> = {};
    const outcomesByScenario: Record<string, number> = {};
    const outcomesByAudience: Record<string, number> = {};
    const branchUsage: Record<string, number> = {};
    const ctaClicksByTarget: Record<string, number> = {};
    const conversionsByCombo: Record<string, number> = {};

    let startCount = 0;
    let completionCount = 0;
    let ctaClickCount = 0;

    for (const event of events) {
      if (event.eventType === "demo_started") {
        startCount += 1;
        bump(startsByScenario, event.scenario);
      }
      if (event.eventType === "demo_completed") {
        completionCount += 1;
        bump(completionsByScenario, event.scenario);
        bump(completionsByAudience, event.audience);
        bump(outcomesByScenario, `${event.scenario}:${event.outcome ?? "unknown"}`);
        bump(outcomesByAudience, `${event.audience}:${event.outcome ?? "unknown"}`);
      }
      if (event.eventType === "demo_step" && event.branch) {
        bump(branchUsage, event.branch);
      }
      if (event.eventType === "demo_cta_clicked") {
        ctaClickCount += 1;
        bump(ctaClicksByTarget, `${event.audience}:${event.ctaTarget ?? "unknown"}`);
      }
    }

    for (const lead of demoLeads) {
      bump(
        conversionsByCombo,
        `${lead.attributionScenario ?? "unknown"}:${lead.attributionAudience ?? "unknown"}:${lead.attributionOutcome ?? "unknown"}`,
      );
    }

    return {
      totals: {
        starts: startCount,
        completions: completionCount,
        completionRate: startCount > 0 ? completionCount / startCount : 0,
        ctaClicks: ctaClickCount,
        ctaRateFromCompletion: completionCount > 0 ? ctaClickCount / completionCount : 0,
        demoAttributedLeads: demoLeads.length,
      },
      startsByScenario,
      completionsByScenario,
      completionsByAudience,
      outcomesByScenario,
      outcomesByAudience,
      branchUsage,
      ctaClicksByTarget,
      conversionsByCombo,
      recentDemoLeads: demoLeads.slice(0, 12).map((lead) => ({
        _id: lead._id,
        contactName: lead.contactName,
        email: lead.email,
        segment: lead.segment,
        attributionScenario: lead.attributionScenario ?? "unknown",
        attributionAudience: lead.attributionAudience ?? "unknown",
        attributionOutcome: lead.attributionOutcome ?? "unknown",
        createdAt: lead.createdAt,
      })),
    };
  },
});

export const getSubmissionOverview = query({
  args: {
    leadLimit: v.optional(v.number()),
    assessmentLimit: v.optional(v.number()),
    newsletterLimit: v.optional(v.number()),
    contactLimit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireStaffRole(ctx, ["facilitator", "admin"]);

    const leadLimit = Math.min(args.leadLimit ?? 80, 200);
    const assessmentLimit = Math.min(args.assessmentLimit ?? 60, 120);
    const newsletterLimit = Math.min(args.newsletterLimit ?? 60, 120);
    const contactLimit = Math.min(args.contactLimit ?? 60, 120);

    const [leads, assessments, newsletter, contacts] = await Promise.all([
      ctx.db.query("leads").order("desc").take(leadLimit),
      ctx.db.query("assessmentRuns").order("desc").take(assessmentLimit),
      ctx.db.query("newsletter").order("desc").take(newsletterLimit),
      ctx.db.query("contacts").order("desc").take(contactLimit),
    ]);

    const leadsBySegment: Record<string, number> = {};
    const initiativeByIntent: Record<string, number> = {};
    const assessmentsBySegment: Record<string, number> = {};
    const newsletterByLang: Record<string, number> = {};

    for (const lead of leads) {
      bump(leadsBySegment, lead.segment);
      if (lead.segment === "initiative") {
        bump(initiativeByIntent, lead.intent);
      }
    }

    for (const assessment of assessments) {
      bump(assessmentsBySegment, assessment.segment);
    }

    for (const entry of newsletter) {
      bump(newsletterByLang, entry.lang);
    }

    return {
      totals: {
        leads: leads.length,
        initiativeLeads: leads.filter((lead) => lead.segment === "initiative").length,
        assessments: assessments.length,
        newsletter: newsletter.length,
        contacts: contacts.length,
      },
      leadsBySegment,
      initiativeByIntent,
      assessmentsBySegment,
      newsletterByLang,
      recentLeads: leads.slice(0, 30).map((lead) => ({
        _id: lead._id,
        contactName: lead.contactName,
        email: lead.email,
        segment: lead.segment,
        intent: lead.intent,
        organizationName: lead.organizationName ?? null,
        sourcePage: lead.sourcePage,
        createdAt: lead.createdAt,
        status: lead.status,
      })),
      recentAssessments: assessments.slice(0, 20).map((assessment) => ({
        _id: assessment._id,
        segment: assessment.segment,
        score: assessment.score,
        recommendedOffer: assessment.recommendedOffer,
        createdAt: assessment.createdAt,
      })),
      recentNewsletter: newsletter.slice(0, 20).map((entry) => ({
        _id: entry._id,
        email: entry.email,
        lang: entry.lang,
        createdAt: entry.createdAt,
      })),
      recentContacts: contacts.slice(0, 20).map((entry) => ({
        _id: entry._id,
        email: entry.email,
        message: entry.message ?? null,
        createdAt: entry.createdAt,
      })),
    };
  },
});
