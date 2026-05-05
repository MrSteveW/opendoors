# OpenDoors v4 — Claude Notes

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| `next` | 16.1.1 | Framework |
| `react` / `react-dom` | 19.2.3 | UI runtime |
| `typescript` | ^5 | Language |
| `tailwindcss` | ^4 | Styling |
| `@clerk/nextjs` | ^6.36.7 | Auth (users, sessions, roles via `publicMetadata.user_role`) |
| `@supabase/supabase-js` | ^2.98.0 | Database client |
| `pg` | ^8.16.3 | Direct Postgres access |
| `@fullcalendar/react` + plugins | ^6.1.20 | Calendar UI (daygrid, interaction) |
| `@radix-ui/*` | various | Headless UI primitives (checkbox, dialog, label, select, separator, slot) |
| `zustand` | ^5.0.10 | Client state management |
| `motion` | ^12.26.2 | Animations |
| `lucide-react` | ^0.562.0 | Icons |
| `clsx` + `tailwind-merge` + `class-variance-authority` | latest | Conditional class utilities |
| `tailwindcss-animate` | ^1.0.7 | Tailwind animation plugin |

## Working preferences

**Do not add files to fix tooling or TypeScript issues.** If a linter, TypeScript, or IDE issue can be resolved through an IDE/editor setting or config change, prefer that. Do not create extra files (e.g. `global.d.ts`) that clutter the codebase when a simpler non-file solution exists.

## Next.js file conventions used in this project

### `proxy.ts` (Clerk middleware)
Next.js 16+ uses `proxy.ts` as the middleware filename — **not** `middleware.ts`. Do not suggest renaming it. `middleware.ts` is only correct for Next.js ≤15. The code inside is identical either way; only the filename differs.

This project's `proxy.ts` runs `clerkMiddleware()` and enforces auth: unauthenticated users are redirected to `/sign-in`, and non-admins are redirected away from `/admin(.*)`.

Reference: https://clerk.com/docs/nextjs/getting-started/quickstart

### `app/global-not-found.tsx`

This is a valid Next.js experimental file convention (introduced v15.4.0), **not** a mis-named `not-found.tsx`.

It is enabled via `experimental.globalNotFound: true` in `next.config.ts` and handles unmatched URLs at the routing level, bypassing layout rendering entirely. It must return a full `<html>` document. Do not flag this file as incorrectly named.

Reference: https://nextjs.org/docs/app/api-reference/file-conventions/not-found#global-not-foundjs-experimental
