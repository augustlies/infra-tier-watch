# infra-tier-watch

Live dev-infra pricing & free-tier cliff tracker powered by Devin Bots.

## Architecture
- **Web (`apps/web`)**: Next.js 15 + TypeScript interactive cost calculator for comparing free-tier limits and overage cliffs.
- **Watcher (`packages/watcher`)**: Playwright headed-browser scout + `routeFromHAR` deterministic CI fixtures + Zod schema validation.
- **Orchestration**: GitHub Actions + Linear MCP handoff + Slack Block Kit alerts on schema drift or circuit-breaker trips.

## Day 1 Target Pricing Pages
- `https://vercel.com/pricing`
- `https://supabase.com/pricing`
- `https://posthog.com/pricing`
- `https://resend.com/pricing`

## Workflow
1. **Browser Scout Bot** opens target pricing pages, toggles billing/usage sliders, and commits pinned HAR fixtures + `snapshots/<date>/pricing.diff.json` to a staging branch and updates Linear.
2. **Patch & QA Bot** validates `data/pricing.json` via Zod (`pnpm --filter watcher test`), patches `apps/web/src/lib/calculator.ts`, runs Playwright against HAR fixtures, and opens a PR with a Markdown diff table.
3. **Circuit Breakers**: Max 2 Playwright retries; flaky tests are quarantined with `@flaky` and reported to Slack via Block Kit webhooks.
