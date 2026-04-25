# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
