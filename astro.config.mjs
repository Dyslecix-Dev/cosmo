// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "static",

  // TODO: change site
  site: "https://yourdomain.com",

  integrations: [mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
