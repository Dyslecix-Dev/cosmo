# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.1] - 2026-04-30

### Changed
- Removed `ClientRouter` / view transitions from `BaseLayout.astro`; navigation falls back to full-page loads (prefetch is still on).
- Fonts now load only the `latin` subset to shrink payload.
- Bumped package versions.
- Removed bundled `lefthook.yml` from shipped templates; downstream users opt into a hook runner of their choice.
- Removed bundled GitHub Actions workflows from shipped templates.

### Fixed
- Blog posts now set `ogType="article"` (was defaulting to `website`).
- 404 page excluded from the generated sitemap.
- Skip-to-content button raised above the navbar via higher `z-index`.

## [0.3.0] - 2026-04-28

### Added
- npm and yarn 4 template variants (`template-npm/`, `template-yarn/`) alongside the existing pnpm variant (now at `template-pnpm/`). Users scaffold the variant matching their package manager — only that variant's files land in the scaffolded project.
- `scripts/sync-templates.mjs` — keeps `template-npm/` and `template-yarn/` in sync with the canonical `template-pnpm/` source. Run with `--check` to verify no drift (enforced in CI and pre-commit).
- `scripts/overlays/{npm,yarn}/` — per-PM overrides (`package.json`, `lefthook.yml`, `README.md`; yarn also adds `.yarnrc.yml` and `.gitignore`).
- CI now runs a sync-check job and a typecheck+build matrix across all three variants.

### Changed
- **Breaking:** scaffold path changed from `DyslecixDev/cosmo/template` to `DyslecixDev/cosmo/template-pnpm` (pnpm), `template-npm` (npm), or `template-yarn` (yarn).
- Root `lefthook.yml` updated to proxy into `template-pnpm/` and run sync-check on pre-commit.
- `vite` pinned as an explicit devDependency (`^7.3.2`) across all variants to prevent type conflicts in npm and yarn flat-hoist installs.
- Removed bundled `docs` collection and `pages/docs/[slug].astro`; setup guides now live at [cosmo.dyslecix.dev](https://cosmo.dyslecix.dev). The "Next Steps" cards and 404 page now link there directly.
- Demo URL changed from `cosmo.dyslecix.dev` to `cosmo-example.dyslecix.dev`
- Navbar docs dropdown removed; navbar now has Home, Blog, and theme toggle only

## [0.2.0] - 2026-04-25

### Changed
- Moved template into `template/` subdirectory so `pnpm create astro --template DyslecixDev/cosmo/template` ships only template files; meta-repo files (LICENSE, CHANGELOG, .github/, .vscode/) stay at the root and no longer leak to downstream users
- Navbar adjusted for xs viewport with responsive layout improvements

### Fixed
- Astro install error caused by lefthook postinstall running before deps were available

## [0.1.0] - 2026-04-25

### Added
- Astro 6 static site boilerplate with TypeScript strict mode
- Tailwind CSS v4 via Vite plugin with design tokens system
- MDX support with Astro MDX integration
- Blog collection with pagination and tag taxonomy
- Docs collection with setup guides
- SEO component with centralized metadata defaults via `astro-seo`
- Dark mode toggle with class-based theming and no FOUC
- Navbar with animated docs dropdown and theme switcher
- Callout component for MDX (note/danger variants)
- Sitemap and RSS feed generation
- Biome for unified linting and formatting
- Lefthook for pre-commit (biome) and pre-push (typecheck) git hooks
- Astro fonts integration with Space Mono and Roboto Mono from Fontsource
- Link prefetching enabled by default
- Draft support for blog and docs collections
- Reading time calculation for blog posts
- Related entries suggestions for blog posts
- Dynamic 404 page
- Placeholder asset generation script
- GitHub Actions CI workflows for typecheck, build, and code quality
