# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Removed bundled `docs` collection and `pages/docs/[slug].astro`; setup guides now live at [cosmo.dyslecix.dev](https://cosmo.dyslecix.dev). The "Next Steps" cards and 404 page now link there directly.
- Demo URL changed from `cosmo.dyslecix.dev` to `cosmo-example.dyslecix.dev`
- Navbar docs dropdown removed; navbar now has Home, Blog, and theme toggle only

## [0.2.0] - 2026-04-25

### Changed
- Moved template into `template/` subdirectory so `pnpm create astro --template Dyslecix-Dev/cosmo/template` ships only template files; meta-repo files (LICENSE, CHANGELOG, .github/, .vscode/) stay at the root and no longer leak to downstream users
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
