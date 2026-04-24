# Example content scaffolding plan

Tracks the multi-commit `feat/example-content` initiative: adding agnostic example content (blog + docs guides), presentation patterns (card grid, TOC, pagination, callouts, hero), and components to cosmo, in a way that downstream users can rename or delete when adapting cosmo for their own site.

**This file is the source of truth across conversations.** Each commit entry below is self-contained — a fresh conversation can execute commit N from this file alone, without re-reading the source references.

## Source references (do not re-scan unless the spec itself needs revision)

- **Sibling repos** at `~/Desktop/personal-code/`:
  - `astro-blog-example` — official Astro team blog starter. Source of `blog` collection schema shape, `BlogPost.astro` layout structure, `[...slug]` routing pattern.
  - `astro-starlight-example` — official Astro team Starlight starter. Source of `docs` collection naming.
  - `astro-example` — minimal Astro starter (already matches cosmo's bare state; no patterns to extract).
- **Visual references** (presentation patterns only — not content):
  - https://zeon.studio/preview?project=astroplate
  - https://bookworm-light-astro.vercel.app/

## Locked-in decisions

- **Naming:** Use Astro-team conventions — collection name `blog`, schema fields `title / description / pubDate / updatedDate / heroImage / tags`. **No `example-` filename prefixes** — example status is signaled via this file + README + inline comments only. Downstream users rename/delete by hand.
- **Two example collections:** `blog` (chronological, gets pagination + tag taxonomy + related entries) and existing `docs` (evergreen, gets prev/next sibling nav).
- **Site constants stay centralized in `src/components/SEO.astro`** (existing pattern). Do **not** add `src/consts.ts` even though `astro-blog-example` uses it.
- **Content:** Generic lorem ipsum for `blog` entries; `docs` collection dogfoods cosmo (real setup guides).
- **Styling:** Tailwind v4 only, using existing tokens in [src/styles/global.css](src/styles/global.css). No hand-written CSS.
- **MDX callouts:** hand-rolled `<Callout type="note|tip|warning|danger">` component (no Starlight dependency).
- **Reading time:** hand-rolled (word count / 200 wpm); no `reading-time` package dependency.
- **TOC:** uses Astro's `headings` from `render()`; no library.
- **Tags only**, not categories. Schema: `tags: z.array(z.string()).optional()`.
- **Related entries:** computed from shared tags, max 3, blog detail page only.
- **Prev/next:** chronological on blog detail; sibling order on docs detail.
- **Placeholder images:** 3 solid-color PNGs generated via a `sharp` script, each with TODO comments at the import site for replacement.
- **Pagination threshold:** seed 10 lorem-ipsum entries (page size 6) so `/blog/2` renders meaningfully.
- **Commit style:** Conventional Commits (`feat:`, `chore:`, `docs:`). **No co-author trailer.** Matches existing repo history.

## Out of scope (deferred)

- Light/dark mode toggle
- Visual polish pass (typography scale, spacing, real imagery) — TODO comments left at every placeholder
- Search (Pagefind)
- Author metadata
- Categories taxonomy (only tags shipped)

## Per-commit verification

Before each commit:
1. `pnpm typecheck` passes
2. `pnpm check` passes (Biome lint + format)
3. `pnpm build` passes
4. Spot-check new routes in `pnpm dev`

## Commit checklist

Execute in order on the `feat/example-content` branch. Tick the box after each commit lands.

### [x] 1. `chore: add EXAMPLES_TODO.md tracking checklist and CLAUDE.md pointer`
This file + a pointer section in [CLAUDE.md](CLAUDE.md) so future conversations discover the spec.

### [x] 2. `feat: generate solid-color placeholder hero images`
- Add `scripts/generate-placeholders.mjs` using `sharp` (add as devDep if not present).
- Generate 3 PNGs into `src/assets/`:
  - `placeholder-home-hero.png` — 1920×1080, fill `#1f2937`
  - `placeholder-blog-hero.png` — 1200×630, fill `#374151`
  - `placeholder-og-fallback.png` — 1200×630, fill `#111827`
- Wire `placeholder-og-fallback.png` into `SEO.astro` as the OG image fallback.
- Add inline TODO comments at every import site: `{/* TODO: replace with real imagery */}`.

### [x] 3. `feat: add blog collection schema and lorem-ipsum seed entries`
- Update [src/content.config.ts](src/content.config.ts), add `blog`:
  ```ts
  blog: defineCollection({
    loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
    schema: ({ image }) => z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),
      tags: z.array(z.string()).optional(),
    }),
  })
  ```
- Create `src/content/blog/` with **10 entries** (mix `.md` and `.mdx`):
  - Lorem ipsum titles, descriptions, body (~300-600 words each, varied heading depth so TOC is non-trivial).
  - Vary `pubDate` across the last ~6 months.
  - Use ~6-8 distinct tags total, sprinkled with overlap so taxonomy + related-entries pages are non-trivial.
  - All entries reference `placeholder-blog-hero.png` for `heroImage`.

### [x] 4. `feat: add MDX callout components`
- `src/components/callouts/Callout.astro`. Props: `type: "note" | "tip" | "warning" | "danger"`, optional `title`.
- Tailwind-styled. Each type uses a neutral semantic accent (`blue-500`, `green-500`, `amber-500`, `red-500`) until brand tokens exist.
- Demonstrate in at least one `.mdx` blog seed entry (amend the entry from commit 3, or modify in this commit).

### [x] 5. `feat: add blog index page with card grid and pagination`
- `src/pages/blog/[...page].astro` using Astro's `paginate()`, page size 6.
- Extract reusable `src/components/blog/EntryCard.astro` (hero image, title, description, formatted date, tag chips).
- Card grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.
- Pagination controls at bottom (prev/next + page numbers).

### [ ] 6. `feat: add blog detail page with TOC, reading time, prev/next, related`
- `src/pages/blog/[...slug].astro` rendering blog entries.
- `src/layouts/BlogPost.astro` (mirrors `astro-blog-example`'s structure; Tailwind-styled).
- **TOC:** from `render()` `headings`. Sticky sidebar on `lg:` breakpoint.
- **Reading time:** helper in `src/lib/reading-time.ts` (word count / 200 wpm).
- **Prev/next:** chronological by `pubDate`. Compute in `getStaticPaths`.
- **Related:** helper in `src/lib/related-entries.ts` — up to 3 entries sharing ≥1 tag, sorted by tag-overlap count then date.

### [ ] 7. `feat: add tag taxonomy pages`
- `src/pages/blog/tags/[tag].astro` — `getStaticPaths` enumerates unique tags. Reuses `EntryCard.astro` from commit 5.
- `src/pages/blog/tags/index.astro` — lists all tags with counts.

### [ ] 8. `feat: flesh out docs collection with cosmo setup guides`
- Replace placeholder docs with real guides under `src/content/docs/`:
  - `getting-started.md`
  - `rebranding-via-tokens.md`
  - `adding-a-content-collection.md`
  - `wiring-rss.md`
  - `seo-checklist.md`
- Add optional `order: z.number().optional()` to docs schema for explicit sibling ordering.
- Update `src/pages/docs/[slug].astro` to add prev/next sibling nav (use `order` if present, else alphabetical).
- Use `<Callout>` from commit 4 in at least 2 guides.

### [ ] 9. `feat: add home page hero and CTA section with featured entries`
- Replace `src/pages/index.astro` content.
- Sections: hero (uses `placeholder-home-hero.png`), CTA, featured blog entries grid (latest 3 from `getCollection('blog')`, reuses `EntryCard.astro`).
- Inline TODO at hero copy: `{/* TODO: replace hero copy and imagery for your project */}`.

### [ ] 10. `feat: wire RSS feed to blog collection`
- Update `src/pages/rss.xml.js`: replace `posts = []` with `await getCollection('blog')`, sort by `pubDate` desc, map to RSS items.

### [ ] 11. `docs: update README and CLAUDE.md for example scaffolding`
- README: new section **"Example content shipped with cosmo"** listing all scaffolding paths and deletion/rename guidance.
- CLAUDE.md: add the deferred visual-polish work to the "Known TODOs" list. Remove the in-progress pointer to `EXAMPLES_TODO.md` (this file).
- **Do not auto-delete `EXAMPLES_TODO.md`** — wait for explicit user confirmation.
