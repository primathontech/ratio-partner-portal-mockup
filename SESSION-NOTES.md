# Ratio Partner Portal — mockup session notes

Local-only notes (gitignored, not pushed) to resume this project quickly in a
new conversation. The full conversation transcript is also resumable directly
via Claude Code's own `--continue` / `--resume` — this file is a faster-to-skim
summary of where things stand, for when you don't want to re-read the whole
transcript.

## What this is
A static, offline HTML/CSS/vanilla-JS clickable mockup of Ratio's
partner/developer portal (conceptually `partners.ratio.win`), grounded in PRDs
from the sibling repo `/Users/singaaka/GoKwik/ratio-product-context`. No build
step — every page opens via a local `python3 -m http.server` and is pure
static HTML with inline `<script>` blocks, sharing `js/shell.js` and
`js/icons.js`.

## Where it lives
- Local: `/Users/singaaka/GoKwik/partner-portal/` (git repo, `main` branch)
- GitHub: https://github.com/primathontech/ratio-partner-portal-mockup (public repo under the `primathontech` org)
- Live: https://primathontech.github.io/ratio-partner-portal-mockup/ (GitHub Pages, serves `main` branch root, rebuilds automatically on push)
- Reference PRDs: `/Users/singaaka/GoKwik/ratio-product-context/OND26/prds/` (PRD1 partner identity, PRD2 portal redesign, PRD3 collaborator access). PRD4 (ecosystem billing/plans/proration) isn't merged on main there — it was fetched from the still-open PR `GoKwik/ratio-product-context#118` and saved to this session's scratchpad as `PRD4-ecosystem-billing-plans-proration.md`; re-fetch via `gh pr view 118` / `git show origin/aakash/ond26-prd4-ecosystem-billing:...` if needed again.

## Conventions established (read before editing)
- `openModal(id)` / `closeModal(id)` / `showToast(msg)` / `switchTab(group,key,evt)` / `toggleDropdown(id)` all live in `js/shell.js` — reuse them everywhere.
- `icon(name, size)` in `js/icons.js` returns inline stroke-outline SVGs.
- `.demo-version-switch` — a page-fixed top-right `<select>` used throughout to let a reviewer flip between two mock states of a page (has/no data, public/private app, etc.). Stack multiple by offsetting `top` (16px, 46px, 76px...).
- `.modal-overlay` / `.modal` is the dense-content modal pattern (sticky header, scrolling body, sticky footer) — used for everything from the payout itemization/invoice to the plan wizard to the log detail viewer.
- Cross-page tab deep-linking: `settings.html#billing` and `stores.html#dev` work (small `if (location.hash === '#x') switchTab(...)` added to each page's init script) — follow this pattern if adding more.
- Markdown-with-toolbar editor (Bold/Italic/Link/List + Write/Preview tabs) is duplicated per-field (`mdBold`/`mdWrap`/... re-scoped by id) in settings.html (org description), app-detail.html (listing description, version changelog) — copy the pattern again rather than centralizing it.
- Testing protocol used for every change: spin up `python3 -m http.server` on a free port, drive with an **isolated named** `playwright-cli -s=<name>` session (plain `file://` is blocked by the playwright-cli skill), verify zero new console errors (the only persistent one is a benign favicon 404 everywhere), screenshot key states, clean up the server + `.playwright-cli/`, then commit.
- India-only throughout: ₹ INR, GST 18%, no USD. "Building and listing apps on Ratio is free — no platform fee" is a load-bearing fact (shapes the Payouts invoice framing). Ellora (a separate team/product) owns identity/auth/billing/GST invoicing — hence the red "this will be provided by Ellora, this is just a mockup" disclaimers on login/signup and the profile modal's email/password/Google-link note.
- Large, well-scoped chunks of work were repeatedly delegated to background `Agent` calls (not `fork`, since they needed to run truly concurrently) so the user could keep working on other pages — several rounds ran 2–3 agents in parallel against the *same* file with an explicit "re-read and reapply, never revert, whoever commits last sweeps both" coordination protocol. That pattern worked cleanly every time it was used.

## Feature inventory (by area, newest conventions last)
- **Landing/marketing pages**: landing.html, support.html (FAQ + live search), terms.html, privacy.html, changelog.html — all with a shared rich footer; `documentation.html` was deleted, every link now points to `https://partners.ratio.win/docs#<anchor>`.
- **Auth**: login.html, signup.html (both carry the Ellora-mockup disclaimer).
- **Onboarding**: onboarding.html — create-or-join-org flow, multi-invite list, and a 5s provisioning loader ported from the real admin design system (`naman-prima/ratio-website`).
- **Home dashboard** (home.html): 6-item "Get started" checklist (team/dev-store/first-app/billing-address/payout-details/partner-details), all wired; animated Earnings chart.
- **Team** (team.html): Members (invite modal, per-row kebab: change role / suspend-reactivate, never delete), Roles (3 fixed system roles — Owner/Admin/Viewer, not editable — plus custom roles, role view/create now modal-based with real toggleable permissions and a members-list footer), Security, Audit log (multi-select actor/action filters).
- **Stores** (stores.html): Dev tab (has/no-dev-store demo states, delete-store flow), Client transfer (coming-soon empty state), Collaborations (no expiry concept for granted access, only for pending requests; `sent`→Edit scopes, `rejected`→Revise & resend only, `compound`→**now also** Edit scopes on the in-flight additional-permissions ask; scopes picker uses the same collapsible-accordion chrome as Team's permissions picker).
- **Apps list** (apps.html) + **manual create** (app-create.html): rewritten create-app dropdown copy, broken status filters removed, live search, has/no-apps demo states; create form has version name, validation, a richer scopes picker, and the public/private distribution choice fixed at creation time.
- **App detail** (app-detail.html) — the biggest surface, subnav order: Overview, Listing, Distribution, Plans, Versions, Logs, API keys, Webhooks, Extensions and configs.
  - Overview: linked dashboard (webhook rate, payout trend, installs, credentials, recent versions).
  - Listing: public marketplace fields (markdown description, categories, icon+hero images between name/description, validated slug).
  - Distribution: read-only app type (fixed at creation), install metrics, searchable+paginated installed-merchants list, install URL block (`admin.ratio.win/app/oauth?client_id=...&redirect_url=...` format, copy + Install-app button + merchant-facing note + manifest-derivation note) — scoped to this tab only, not a page-wide banner.
  - Plans: full PRD4-grounded multi-step plan wizard (type → pricing/usage-meters-and-tiers → trial/features/discount/SAC → audience+welcome-link+review), app-type-aware audience terminology (Public app → "Public/Private plans"; Private app → "Global audience"/"Merchant custom"), has/no-plans demo states.
  - Versions: list (review status, pending-item count, current/release merged into one column, no author/name fields) → per-version detail drill-down (activity log, pending reviewer messages with name+time, markdown changelog frozen once approved/published, Save-changelog button, Send-for-review on draft / Publish on approved, a brief per-version config-snapshot card).
  - Logs (telemetry): filter+date-range, sampling banner, event-volume chart, table of graphql/webhook/api rows, detail **modal** (converted from a cramped slide-over) with request+response bodies for all three kinds, Previous/Next buttons **and arrow-key navigation**, and a demo-scope disclaimer on graphql/api rows only (webhook logging is the real near-term scope target; see the description given to the user's PRD-writing agent for the full breakdown).
  - Extensions and configs (renamed from "Extensions"): version-sourced badge+note banner (same pattern added to Webhooks tab too), extension-type badges (Theme app block / Admin action as pills), manifest config read-only block, "Recent deliveries" removed from Webhooks.
  - Header kebab menu: Transfer ownership (destination org slug → mock request).
- **Settings** (settings.html): General (markdown org description, logo upload+crop, validated required fields), Payouts (list→itemization→invoice, two demo states, payout-account dual-entry+confirm-diff flow, billing-information card feeding the invoice's Bill-to block, red warnings when account/billing info missing, pending+accumulated-this-cycle figures), Danger zone.
- **Shared shell** (`js/shell.js`): notifications (all types, each wired to a real destination), Invitations (accept/decline, badge count), Profile modal (editable email with OTP-style verify flow, change-password modal, Google link/unlink, delete-account danger zone).

## Current status
Working tree clean, latest commit `bc7be9d` pushed to `main`, GitHub Pages rebuilt and confirmed live at the URL above. No known open bugs or pending agent work as of this note.

## To resume
1. Fastest: `claude --continue` (or `--resume` and pick this session) in this directory — restores full conversation context.
2. Otherwise: re-read this file, then `git log --oneline` to see exactly what's landed, and pick up from wherever the user's next ask points.
