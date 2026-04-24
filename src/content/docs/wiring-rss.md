---
title: Wiring RSS
description: Hook the RSS feed up to a content collection.
order: 4
---

Cosmo ships with a stub RSS endpoint at [src/pages/rss.xml.js](src/pages/rss.xml.js). Until you wire it to a collection, the feed renders with zero items.

## Wire to the blog collection

Replace the empty `posts` array with a `getCollection` call and sort by `pubDate`:

```js
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = (await getCollection("blog")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  return rss({
    title: "Cosmo",
    description: "A site built with Cosmo.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
    customData: "<language>en-us</language>",
  });
}
```

## Discoverability

Add an autodiscovery `<link>` in `src/layouts/BaseLayout.astro`:

```astro
<link rel="alternate" type="application/rss+xml" title="Cosmo" href="/rss.xml" />
```

The feed lives at `/rss.xml`. The `site` field in `astro.config.mjs` must be set for absolute URLs to resolve correctly.
