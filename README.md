# Astro Starter Kit: Basics

```sh
pnpm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
# Chaos Softball SD

Lightweight Astro site with small React client components. Server-rendered pages (Astro) provide fast first paint; React handles interactive parts such as navigation and forms.

TL;DR — run locally:

```bash
pnpm install
pnpm dev
```

## Tech

- Astro (SSR + static)
- React (client components)
- TypeScript
- Contentful (CMS)
- pnpm

## Quick start

- Install and run:

```bash
pnpm install
pnpm dev
```

- Build and preview:

```bash
pnpm build
pnpm preview
```

## Environment

Provide Contentful credentials using environment variables (see `src/services/contentful/contentful.ts`). Use a `.env` for local development if needed.

## Layout / notable files

- `src/layouts/Header/Header.astro` — builds the navigation `items` passed to both `MainNav` and `MobileNav`.
- `src/layouts/MainNav/MainNav.tsx` — desktop nav with scrollspy/anchor handling.
- `src/layouts/MobileNav/MobileNav.tsx` — mobile nav; contains iOS Safari visibility handling and open-in-new-window behavior.
- `src/utils/useScrollSpy.ts` — custom hook used to track active in-page sections.

## Navigation behavior notes

- Mobile links that should open in a new tab/window derive from the Contentful flag `openInNewWindow` — the header mapping sets `openinnewwindow` on each nav item so `MobileNav` can render `target="_blank" rel="noopener noreferrer"`.
- The main nav uses `useScrollSpy` to highlight sections; it intentionally shows no active button when the user scrolls below the last section.

## iOS Safari (mobile) — known issue and mitigation

Opening links via `target="_blank"` can cause iOS Safari to suspend (freeze) the background tab. This could previously leave the mobile nav in a broken state when returning. Mitigations implemented in `MobileNav`:

- Listen for `visibilitychange` and force a nav reset when the page becomes visible again.
- Clean up `body` lock (`overflow`), reset `inert` state, blur focused elements, and force a small re-render to clear stale closures.

If you still experience issues on a specific device/version, provide the iOS and Safari versions so we can further adapt the fix.

## Hydration mismatch / browser extensions

You may see hydration mismatch warnings in development if browser extensions (password managers / autofill) inject DOM nodes before React hydrates. This is usually a development-only annoyance. To reproduce without interference, disable such extensions while testing.

## Troubleshooting checklist

- Link not opening in new tab: confirm Contentful `openInNewWindow` flag is set (mapped in `Header.astro`).
- Mobile nav unresponsive after returning from a new tab: ensure `MobileNav` is up-to-date; try disabling extensions; provide device/version info if it persists.

## Contributing

Open a branch, make changes, and submit a PR with a summary and reproduction steps for any bug fixes.

## License

See `package.json` for license details.

---
