// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  output: "static",

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Space Mono",
      cssVariable: "--font-space-mono",
    },
    {
      provider: fontProviders.fontsource(),
      name: "Roboto Mono",
      cssVariable: "--font-roboto-mono",
    },
  ],

  // TODO: change site
  site: "https://yourdomain.com",

  integrations: [mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
