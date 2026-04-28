# Cosmo

A minimal, use-case-agnostic [Astro](https://astro.build) static site boilerplate. Scaffold it and ship a blog, docs site, landing page, storefront, or portfolio — without spending the first day wiring up SEO, content collections, and formatting.

Live demo: [cosmo-example.dyslecix.dev](https://cosmo-example.dyslecix.dev)
Full docs: [cosmo.dyslecix.dev](https://cosmo.dyslecix.dev)

## What's included

- **Astro 6** with static output
- **Tailwind CSS v4** via the Vite plugin, with design tokens under `@theme` in [src/styles/global.css](src/styles/global.css)
- **`@tailwindcss/typography`** for prose styling on long-form content
- **TypeScript** (strict) with `@/*` path alias for `src/*`
- **MDX, RSS, and sitemap** integrations pre-wired
- **`astro-seo` wrapper** with sensible defaults (OG, Twitter card, canonical URL)
- **Content collections** with an example `blog` collection, dynamic routes, and tag taxonomy
- **Blog presentation patterns** — paginated index, card grid, detail page with TOC, reading time, prev/next, related entries
- **MDX callouts** (note/danger) for use inside content
- **Sticky navbar** with a class-based **dark mode** toggle (no FOUC)
- **Custom 404 page**
- **View transitions** via Astro's `ClientRouter`
- **Astro fonts** (`astro:assets` `Font` component) via the Fontsource provider — Space Mono + Roboto Mono
- **Link prefetch** enabled by default for faster client-side navigation
- **JSON-LD schema** (`WebSite`) auto-generated and customizable via slots
- **Accessibility**: skip-to-main link, semantic `<time>` elements, `aria-current` nav indicators
- **Draft support** on content collections — set `draft: true` to write without publishing
- **Biome** for lint + format (one tool, no ESLint/Prettier)
- **Lefthook** git hooks — biome on pre-commit, typecheck on pre-push

## Requirements

- **Node 22 LTS or higher** (see [.nvmrc](.nvmrc))
- **pnpm** (the repo is pnpm-only; `pnpm-lock.yaml` is the source of truth)

## Quick start

```sh
pnpm create astro@latest -- --template Dyslecix-Dev/cosmo/template my-site
cd my-site
pnpm install
pnpm dev
```

Then open [http://localhost:4321](http://localhost:4321).

## Scripts

All commands run from the project root:

| Command             | Action                                      |
| :------------------ | :------------------------------------------ |
| `pnpm dev`          | Start the dev server at `localhost:4321`    |
| `pnpm build`        | Typecheck and build the site to `./dist/`   |
| `pnpm preview`      | Preview the built site locally              |
| `pnpm typecheck`    | Run `astro check` (also runs on pre-push)   |
| `pnpm check`        | Lint + format with Biome (no writes)        |
| `pnpm check:fix`    | Lint + format with Biome, applying fixes    |
| `pnpm astro ...`    | Pass-through to the Astro CLI               |

## Project structure

```
.
├── .env.example              # Empty stub — duplicate to .env.local for any secrets you add
├── public/                   # Static assets (favicons, OG images, robots.txt, brand images)
├── src/
│   ├── assets/               # Bundled images (placeholder hero + OG fallback)
│   ├── components/
│   │   ├── Navbar.astro      # Sticky nav, dark-mode toggle
│   │   ├── SEO.astro         # astro-seo wrapper with centralized defaults
│   │   ├── blog/EntryCard.astro
│   │   └── callouts/Callout.astro  # MDX note/danger callouts
│   ├── content/              # Content collections (blog)
│   ├── content.config.ts     # Collection schemas (zod)
│   ├── layouts/
│   │   ├── BaseLayout.astro  # <html> shell, fonts, SEO, ClientRouter
│   │   └── BlogPost.astro    # TOC, reading time, prev/next, related
│   ├── lib/                  # reading-time, related-entries
│   ├── pages/                # File-based routes
│   │   ├── 404.astro
│   │   ├── index.astro
│   │   ├── blog/             # [...page], [...slug], tags/
│   │   └── rss.xml.js        # Wired to the blog collection
│   └── styles/global.css     # Tailwind + design tokens
├── astro.config.mjs
├── biome.json
├── lefthook.yml
└── tsconfig.json
```

## Customizing your site

The full documentation lives at [cosmo.dyslecix.dev](https://cosmo.dyslecix.dev) — guides for getting started, rebranding via tokens, adding collections, wiring RSS, SEO, and deploying.

The example `blog` collection (10 lorem-ipsum entries with tags) is there to demonstrate the index, detail, pagination, tag taxonomy, related-entries, and RSS pieces. Delete the seed entries and write your own — or strip the entire `blog/` collection if you don't need it.

## Content collections

One example collection ships out of the box:

- **`blog`** — chronological posts (`pubDate`, `description`, optional `heroImage` + `tags`). Routes: paginated index at `/blog`, detail at `/blog/[slug]`, and tag taxonomy under `/blog/tags/`.

It follows the standard pattern — a zod schema in [src/content.config.ts](src/content.config.ts) plus pages that call `getCollection()`. Use it as a template for product catalogs, team pages, etc. See the [Astro content collections docs](https://docs.astro.build/en/guides/content-collections/).

## Deploying

Cosmo builds to fully static HTML in `./dist/` and runs on any static host. The shared build settings:

- **Install:** `pnpm install --frozen-lockfile`
- **Build:** `pnpm build`
- **Output:** `dist`
- **Node:** `22 LTS`

Quick pointers per host:

- **Cloudflare Pages** — connect the Git repo, pick the **Astro** framework preset, and add `NODE_VERSION=22` to the build environment.
- **GitHub Pages** — set **Settings → Pages → Source** to **GitHub Actions**. If you're publishing to a project page (`username.github.io/repo`), also set `base: "/repo"` in `astro.config.mjs`.
- **Netlify** — import the repo and accept the defaults; Netlify auto-detects pnpm from `pnpm-lock.yaml`. Set `NODE_VERSION=22` under build environment.
- **Vercel** — import the repo; the **Astro** preset is auto-detected and pnpm is picked up automatically. Confirm Node 22 under project settings.

See [cosmo.dyslecix.dev/docs/deploying](https://cosmo.dyslecix.dev/docs/deploying) for the full step-by-step including a ready-to-paste GitHub Actions workflow and a `netlify.toml`.

## Tooling notes

- **Biome** runs as a git pre-commit hook (auto-fixes staged files via lefthook). Run `pnpm check:fix` locally if you want to format ahead of committing.
- **Typecheck** runs on pre-push — `astro check`, which type-checks `.astro` templates in addition to `.ts`.
