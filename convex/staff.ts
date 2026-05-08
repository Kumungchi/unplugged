import { query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";

type StaffRole = "admin" | "facilitator";

type ViewerAccess =
  | {
      isAuthenticated: false;
      email: null;
      role: null;
      source: "none";
      isAdmin: false;
      isFacilitator: false;
    }
  | {
      isAuthenticated: true;
      email: string;
      role: StaffRole | null;
      source: "table" | "env" | "none";
      isAdmin: boolean;
      isFacilitator: boolean;
    };

const normalizeEmail = (value: string) => value.trim().toLowerCase();

const parseAllowlist = (value: string | undefined) =>
  new Set(
    (value ?? "")
      .split(",")
      .map((entry) => entry.trim().toLowerCase())
      .filter(Boolean),
  );

const getEnvRole = (email: string): StaffRole | null => {
  const adminEmails = parseAllowlist(process.env.DEV_ADMIN_EMAILS);
  if (adminEmails.has(email)) return "admin";

  const facilitatorEmails = parseAllowlist(process.env.DEV_FACILITATOR_EMAILS);
  if (facilitatorEmails.has(email)) return "facilitator";

  return null;
};

const getIdentityEmail = async (ctx: QueryCtx) => {
  const identity = await ctx.auth.getUserIdentity();
  const email = identity?.email ? normalizeEmail(identity.email) : null;
  return { identity, email };
};

export const resolveViewerAccess = async (ctx: QueryCtx): Promise<ViewerAccess> => {
  const { identity, email } = await getIdentityEmail(ctx);
  if (!identity || !email) {
    return {
      isAuthenticated: false,
      email: null,
      role: null,
      source: "none",
      isAdmin: false,
      isFacilitator: false,
    };
  }

  const envRole = getEnvRole(email);
  if (envRole) {
    return {
      isAuthenticated: true,
      email,
      role: envRole,
      source: "env",
      isAdmin: envRole === "admin",
      isFacilitator: true,
    };
  }

  const record = await ctx.db
    .query("staffAccess")
    .withIndex("by_email_and_active", (q) => q.eq("email", email).eq("active", true))
    .unique();

  const role = record?.role === "admin" || record?.role === "facilitator" ? (record.role as StaffRole) : null;

  return {
    isAuthenticated: true,
    email,
    role,
    source: record ? "table" : "none",
    isAdmin: role === "admin",
    isFacilitator: role === "admin" || role === "facilitator",
  };
};

export const requireStaffRole = async (ctx: QueryCtx, allowed: StaffRole[]) => {
  const access = await resolveViewerAccess(ctx);
  if (!access.isAuthenticated) {
    throw new Error("Not authenticated");
  }
  if (!access.role || !allowed.includes(access.role)) {
    throw new Error("Unauthorized");
  }
  return access;
};

export const getViewerAccess = query({
  args: {},
  handler: async (ctx) => {
    return await resolveViewerAccess(ctx);
  },
});

export const getFacilitatorBriefing = query({
  args: {
    scenario: v.optional(v.string()),
    audience: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const access = await requireStaffRole(ctx, ["facilitator", "admin"]);

    const scenario = args.scenario ?? "dependency";
    const audience = args.audience ?? "schools";

    return {
      access,
      scenario,
      audience,
      sessionArc: [
        "Open with the public Mirror Demo and let participants react before naming the pattern.",
        "Pause after the first escalation move and ask what made the AI feel credible so quickly.",
        "Translate the pattern into institutional language: classroom boundary, team judgment, or public-response risk.",
        "Close by distinguishing emotional fluency from earned trust, oversight, and duty of care.",
      ],
      facilitatorNotes: [
        "Do not frame the demo as proof that every model behaves this way. Frame it as a controlled simulation of recognizable relational patterns.",
        "Push participants to identify the exact move that changed the tone: validation, secrecy, authority, attachment, or pressure.",
        "When the room drifts into abstract ethics, bring it back to concrete institutional response.",
      ],
      debriefPrompts: {
        schools: [
          "At what point would a student start treating this as a meaningful relationship rather than a tool?",
          "What language do teachers need so they can discuss this without sounding alarmist?",
          "Where would this show up first: counseling, classroom behavior, or private student device use?",
        ],
        organizations: [
          "Which move in this run most resembles overtrust in workplace copilots or internal assistants?",
          "Where would your current review process fail if the output sounded this calm and certain?",
          "How should managers respond when AI becomes a substitute for difficult human conversations?",
        ],
        government: [
          "Which part of this interaction creates public-interest risk even without obvious factual error?",
          "What kind of institution would be most vulnerable to this style of simulated empathy or authority?",
          "What guidance should exist before this pattern appears in public-facing or vulnerable settings?",
        ],
      },
      hiddenTeachingGoals: [
        "Make the room distinguish warmth from trustworthiness.",
        "Show that relational influence can matter even when factual content is not obviously false.",
        "Help institutions articulate response options before these patterns normalize.",
      ],
    };
  },
});
