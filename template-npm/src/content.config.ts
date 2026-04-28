import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * NOTE: example content collection. Delete or adapt for your use case:
 *  - blog: chronological posts with tags + hero images
 *
 * See https://docs.astro.build/en/guides/content-collections/
 */
const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),
      tags: z.array(z.string()).optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
