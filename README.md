# Cosmo

A minimal, use-case-agnostic [Astro](https://astro.build) static site boilerplate. Clone it and ship a blog, docs site, landing page, storefront, or portfolio — without spending the first day wiring up SEO, content collections, formatting, and CI.

## What's included

- **Astro 6** with static output
- **Tailwind CSS v4** via the Vite plugin, with design tokens under `@theme` in [src/styles/global.css](src/styles/global.css)
- **TypeScript** (strict) with `@/*` path alias for `src/*`
- **MDX, RSS, and sitemap** integrations pre-wired
- **`astro-seo` wrapper** with sensible defaults (OG, Twitter card, canonical URL)
- **Content collections** with an example `docs` collection and dynamic route
- **View transitions** via Astro's `ClientRouter`
- **Fontsource** integration preloading Space Mono + Roboto Mono
- **Biome** for lint + format (one tool, no ESLint/Prettier)
- **Lefthook** git hooks — biome on pre-commit, typecheck on pre-push
- **GitHub Actions** — typecheck, build, and `biome ci` on `main` and `staging`

## Requirements

- **Node 22+** (see [.nvmrc](.nvmrc))
- **pnpm** (the repo is pnpm-only; `pnpm-lock.yaml` is the source of truth)

## Quick start

```sh
git clone https://github.com/Dyslecix-Dev/cosmo.git my-site
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
├── .github/workflows/        # CI (typecheck + build) and code-quality (biome ci)
├── public/                   # Static assets (favicons, OG images, robots.txt)
├── src/
│   ├── components/SEO.astro  # astro-seo wrapper with centralized defaults
│   ├── content/              # Content collections (example: docs/)
│   ├── content.config.ts     # Collection schemas (zod)
│   ├── layouts/BaseLayout.astro
│   ├── pages/                # File-based routes
│   │   ├── index.astro
│   │   ├── docs/[slug].astro
│   │   └── rss.xml.js
│   └── styles/global.css     # Tailwind + design tokens
├── astro.config.mjs
├── biome.json
├── lefthook.yml
└── tsconfig.json
```

## After cloning — customize these

Placeholders are marked with `TODO` comments in the source. Before you deploy:

- **Set your site URL**: `site` in [astro.config.mjs](astro.config.mjs) (required — `SEO.astro` throws without it).
- **Update `robots.txt`**: the `Sitemap:` line in [public/robots.txt](public/robots.txt).
- **Set your Twitter/X handle**: `twitterCreator` default in [src/components/SEO.astro](src/components/SEO.astro).
- **Wire up the RSS feed**: [src/pages/rss.xml.js](src/pages/rss.xml.js) has an empty `posts` array — replace with `getCollection('blog')` (or whatever collection you add).
- **Replace brand assets**: favicons and OG images in [public/](public/).
- **Rebrand tokens**: edit the design tokens in [src/styles/global.css](src/styles/global.css). Every `@theme` variable is exposed as a Tailwind utility.
- **Rebrand the `<body>` defaults**: [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) currently hardcodes `bg-white text-neutral-900`. Swap to your brand tokens and wire up dark mode if needed (marked with a `TODO` in the file).
- **Adapt or delete the example `docs` collection** ([src/content/docs/](src/content/docs/), [src/content.config.ts](src/content.config.ts), [src/pages/docs/](src/pages/docs/)).

## Content collections

The `docs` collection is an example with a zod schema (`title`, `description`, `order`, `draft`) and a dynamic route at `/docs/[slug]`. Use it as a template — schemas for a blog, product catalog, or team page follow the same shape. See the [Astro content collections docs](https://docs.astro.build/en/guides/content-collections/).

## Tooling notes

- **Biome** runs in two places: a git pre-commit hook (auto-fixes staged files via lefthook) and in CI (`biome ci` on every PR). Run `pnpm check:fix` locally if you want to format ahead of committing.
- **Typecheck** runs on pre-push and in CI — both call `astro check`, which type-checks `.astro` templates in addition to `.ts`.
- **VS Code**: the workspace recommends the Astro and Biome extensions and sets them as default formatters ([.vscode/extensions.json](.vscode/extensions.json), [.vscode/settings.json](.vscode/settings.json)).

## License

[MIT](LICENSE) — free to use, modify, and distribute.
