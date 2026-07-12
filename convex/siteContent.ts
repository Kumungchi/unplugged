import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";
import { v } from "convex/values";
import { requireStaffRole } from "./staff";
import { api } from "./_generated/api";

const langValidator = v.union(v.literal("en"), v.literal("cs"));
type Lang = "en" | "cs";

const findRow = async (ctx: QueryCtx | MutationCtx, key: string, lang: Lang) =>
  ctx.db
    .query("siteContent")
    .withIndex("by_key_and_lang", (q) => q.eq("key", key).eq("lang", lang))
    .unique();

// Public: only published values, keyed exactly as requested. Used by the
// public pages (SectorPage, About) to override their hardcoded fallback copy.
export const getPublishedContentBulk = query({
  args: {
    keys: v.array(v.string()),
    lang: langValidator,
  },
  handler: async (ctx, args) => {
    const rows = await Promise.all(
      args.keys.map((key) => findRow(ctx, key, args.lang)),
    );

    const result: Record<string, string> = {};
    for (const row of rows) {
      if (row && row.publishedAt !== undefined) {
        result[row.key] = row.value;
      }
    }
    return result;
  },
});

// Staff-only: every row (draft and published) for the admin editor.
export const getAllContentForAdmin = query({
  args: {},
  handler: async (ctx) => {
    await requireStaffRole(ctx, ["admin", "facilitator"]);
    // Bounded: this is a small, hand-curated editorial table, not an
    // unbounded log — 2000 rows is far more than the site's copy will ever need.
    return await ctx.db.query("siteContent").take(2000);
  },
});

export const upsertContent = mutation({
  args: {
    key: v.string(),
    lang: langValidator,
    value: v.string(),
  },
  handler: async (ctx, args) => {
    const access = await requireStaffRole(ctx, ["admin", "facilitator"]);
    const existing = await findRow(ctx, args.key, args.lang);
    const now = Date.now();

    if (existing) {
      await ctx.db.patch(existing._id, {
        value: args.value,
        updatedBy: access.email,
        updatedAt: now,
      });
    } else {
      await ctx.db.insert("siteContent", {
        key: args.key,
        lang: args.lang,
        value: args.value,
        updatedBy: access.email,
        updatedAt: now,
      });
    }
  },
});

export const publishContent = mutation({
  args: {
    key: v.string(),
    lang: langValidator,
  },
  handler: async (ctx, args) => {
    await requireStaffRole(ctx, ["admin", "facilitator"]);
    const existing = await findRow(ctx, args.key, args.lang);
    if (!existing) {
      throw new Error(`No draft found for ${args.key} (${args.lang}) to publish`);
    }
    await ctx.db.patch(existing._id, { publishedAt: Date.now() });
    // Fire-and-forget: the static site is prerendered at build time, so a
    // publish needs a rebuild to actually reach crawlable HTML. No-ops if
    // VERCEL_DEPLOY_HOOK_URL isn't configured (see siteContentActions.ts).
    await ctx.scheduler.runAfter(0, api.siteContentActions.triggerRebuild, {});
  },
});
