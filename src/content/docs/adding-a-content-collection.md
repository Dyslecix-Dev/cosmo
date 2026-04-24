---
title: Adding a content collection
description: Define a new Astro content collection with a zod schema and render it.
order: 3
---

Cosmo ships with two example collections — `blog` and `docs` — both wired up in [src/content.config.ts](src/content.config.ts). Add your own by following the same pattern.

## 1. Define the schema

Add a new collection in `src/content.config.ts`:

```ts
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      cover: z.optional(image()),
      url: z.string().url().optional(),
    }),
});

export const collections = { docs, blog, projects };
```

## 2. Add entries

Create `src/content/projects/` and drop in `.md` or `.mdx` files with matching frontmatter.

## 3. Render

Create a route under `src/pages/`:

```astro
---
import { getCollection, render } from "astro:content";

export async function getStaticPaths() {
  const projects = await getCollection("projects");
  return projects.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

const { entry } = Astro.props;
const { Content } = await render(entry);
---
<article>
  <h1>{entry.data.title}</h1>
  <Content />
</article>
```

## Deleting the example collections

If you don't need `blog` or `docs`, delete:

- The collection block in `src/content.config.ts`
- The `src/content/<name>/` directory
- The `src/pages/<name>/` route(s)
- Any helpers under `src/lib/` and components under `src/components/<name>/` referenced only by that collection
