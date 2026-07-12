import { action } from "./_generated/server";

// Fires the Vercel Deploy Hook so a publish in /admin/content actually
// reaches the prerendered static HTML on the next build. Requires a
// VERCEL_DEPLOY_HOOK_URL env var set on the Convex deployment (Vercel
// Project Settings -> Git -> Deploy Hooks -> copy the URL, then
// `npx convex env set VERCEL_DEPLOY_HOOK_URL <url>`). No-ops if unset so
// local/dev deployments don't need it configured.
export const triggerRebuild = action({
  args: {},
  handler: async () => {
    const hookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
    if (!hookUrl) {
      console.log("VERCEL_DEPLOY_HOOK_URL is not set — skipping rebuild trigger");
      return null;
    }
    const response = await fetch(hookUrl, { method: "POST" });
    if (!response.ok) {
      console.error(`Deploy hook responded with ${response.status}`);
    }
    return null;
  },
});
