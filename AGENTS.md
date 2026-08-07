# AGENTS.md

SvelteKit 2 + Svelte 5 (runes) + TypeScript (strict) + Tailwind CSS v4. Personal blog/site frontend; static content, all dynamic data comes from a backend API.

## Commands

- `npm run dev` — dev server. Must be reachable at host `gor` (`server.allowedHosts` in `vite.config.ts`), i.e. `http://gor:5173`.
- `npm run check` — typecheck via svelte-check (currently **passes**, 0 errors). Run after any TS/Svelte change.
- `npm run lint` — `prettier --check . && eslint .`. Formatting and lint gate.
- `npm run format` — prettier write over the whole repo.
- `npm run build` — `@sveltejs/adapter-node` build; output is a Node server, not static files. No CI and no test suite.

Note: `lint` is currently failing on `prettier --check` for ~16 files (pre-existing, uncommitted state). Run `npm run format` before committing unless the diff is intentionally formatter-free.

## API access (critical)

- Backend lives at `https://gormadatyan.xyz/api`. Every request goes through **axios** (no `fetch`), and URLs must come from `api_base_url` in `src/lib/utils.ts` — never hardcode an API origin.
- Context split: the browser calls `/api` (same-origin, reverse-proxied); SSR uses the absolute URL. `api_base_url` is `browser ? '/api' : 'https://gormadatyan.xyz/api'`.
- Load functions follow a fail-soft pattern: try axios, catch, log, return empty collections so pages render without data. Preserve this in new loaders.
- Do **not** add `export const prerender = true` to routes that perform API loads. Only `/me` and `/toolchain` are prerendered.

## Data shapes & conventions

- `GET /api/posts?page_size=N&page=M` → `{ posts: [{ post_id, title, summary, upload_date, revision_date, likes }] }`
- `GET /api/posts/:id` → `{ post: { ..., body (markdown), tags } }`
- API dates are `"YYYY-MM-DD HH:MM:SS"`; display code strips the time via `formatDate()` (`split(' ')[0]`).
- Post likes: server action `toggleLike` in `src/routes/posts/[post_id]/+page.server.ts` + a `likedPosts` cookie; the page does optimistic UI with `use:enhance`. Like state must stay in sync via the `$effect` watching `data`.

## Style / framework conventions

- Svelte 5 **runes mode is forced** in `vite.config.ts` — use `$props()`/`$state()`/`$derived()`, not `export let`. `$derived` is read-only; opt in to mutate via `$state` + `$effect`.
- Markdown is rendered in `posts/[post_id]/+page.svelte` with `marked` + `marked-highlight` + `highlight.js` (github-dark CSS import). Don't add another markdown lib.
- Tailwind v4 is CSS-first: theme in `src/routes/layout.css` (`@import 'tailwindcss'` + `@plugin '@tailwindcss/typography'`) — there is no `tailwind.config.js`. Class ordering is handled by `prettier-plugin-tailwindcss` (configured against that CSS file).
- Prettier: **tabs**, single quotes, no trailing commas, width 100.
- `.svelte-kit/` is generated (by `svelte-kit sync`, also on `npm install` via `prepare`); never edit it. `tsconfig.json` extends `.svelte-kit/tsconfig.json`.
