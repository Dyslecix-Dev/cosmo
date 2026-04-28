# Cosmo

A minimal, use-case-agnostic [Astro](https://astro.build) static site boilerplate, distributed as a `create-astro` template.

Live demo: [cosmo-example.dyslecix.dev](https://cosmo-example.dyslecix.dev)
Full docs: [cosmo.dyslecix.dev](https://cosmo.dyslecix.dev)

## Scaffold a project

Cosmo ships a separate variant per package manager. Pick the one you want — only that variant's files end up in your scaffolded project.

**pnpm**

```sh
pnpm create astro@latest -- --template Dyslecix-Dev/cosmo/template-pnpm my-site
cd my-site && pnpm install && pnpm dev
```

**npm**

```sh
npm create astro@latest -- --template Dyslecix-Dev/cosmo/template-npm my-site
cd my-site && npm install && npm run dev
```

**Yarn 4**

```sh
yarn create astro --template Dyslecix-Dev/cosmo/template-yarn my-site
cd my-site && yarn install && yarn dev
```

See the variant's `README.md` for what's included and how to customize it.

## Repo layout

This is the distribution repo, not the template itself.

- [`template-pnpm/`](template-pnpm/) — **canonical** variant. Edit source here.
- [`template-npm/`](template-npm/) and [`template-yarn/`](template-yarn/) — generated from `template-pnpm/` by [`scripts/sync-templates.mjs`](scripts/sync-templates.mjs). Do not edit shared files directly; edit `template-pnpm/` and re-run the sync.
- [`scripts/overlays/<pm>/`](scripts/overlays/) — per-package-manager files (`package.json`, `lefthook.yml`, `README.md`, plus yarn's `.yarnrc.yml` and `.gitignore`) overlaid on top of the canonical source during sync.
- [`.github/workflows/`](.github/workflows/) — CI: typecheck + build matrix across all three variants, biome on the canonical variant, and a sync-check that fails if the variants drift from the canonical source.
- [`.vscode/`](.vscode/) — editor config for this repo. Not scaffolded.
- [`lefthook.yml`](lefthook.yml) — root-level git hooks (biome on pre-commit against `template-pnpm/`, sync-check, typecheck on pre-push). Not scaffolded.
- `LICENSE`, `CHANGELOG.md` — apply to this repo, not to downstream projects.

## Working on the template

Make all source changes inside [`template-pnpm/`](template-pnpm/), then regenerate the variants:

```sh
cd template-pnpm
pnpm install
pnpm dev          # iterate
cd ..
node scripts/sync-templates.mjs   # regenerate template-npm/ and template-yarn/
```

If you change a per-PM file (lockfile dependencies, lefthook commands, README copy), edit the appropriate file in [`scripts/overlays/<pm>/`](scripts/overlays/) and re-run the sync. Lockfiles (`package-lock.json`, `yarn.lock`) are owned by their variant and not overwritten by the sync — regenerate them manually with `npm install` / `yarn install` after dependency changes.

`node scripts/sync-templates.mjs --check` exits non-zero if any variant has drifted; CI and the pre-commit hook both run this.
