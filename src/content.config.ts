import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * NOTE: example content collection. Delete or adapt for your use case:
 *  - blog:     src/content/blog, schema with publishedAt, tags, etc.
 *  - docs:     keep this one, add sidebar ordering
 *  - products: src/content/products, schema with price, sku, images
 *
 * See https://docs.astro.build/en/guides/content-collections/
 */
const docs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1).optional(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

export const collections = { docs };
