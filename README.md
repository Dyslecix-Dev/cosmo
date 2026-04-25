# Cosmo

A minimal, use-case-agnostic [Astro](https://astro.build) static site boilerplate, distributed as a `create-astro` template.

Live demo: [cosmo.dyslecix.dev](https://cosmo.dyslecix.dev)

## Scaffold a project

```sh
pnpm create astro@latest -- --template Dyslecix-Dev/cosmo/template my-site
cd my-site
pnpm install
pnpm dev
```

The `/template` suffix points `create-astro` at the [`template/`](template/) subdirectory — only those files end up in your scaffolded project. See [`template/README.md`](template/README.md) for what's included and how to customize it.

## Repo layout

This is the distribution repo, not the template itself.

- [`template/`](template/) — what gets scaffolded. Everything in here ships verbatim into downstream projects.
- [`.github/workflows/`](.github/workflows/) — CI for this repo (typecheck + build + biome on `template/`). Not scaffolded.
- [`.vscode/`](.vscode/) — editor config for this repo. Not scaffolded.
- [`lefthook.yml`](lefthook.yml) — root-level git hooks that proxy into `template/` (biome on pre-commit, typecheck on pre-push). Not scaffolded.
- `LICENSE`, `CHANGELOG.md` — apply to this repo, not to downstream projects.

## Working on the template

```sh
cd template
pnpm install
pnpm dev
```

All template development happens inside [`template/`](template/). Run `pnpm` commands from there.
