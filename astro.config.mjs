// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: change site
  site: 'https://yourdomain.com',

  integrations: [mdx(), sitemap()],

  vite: {
    // @ts-ignore
    plugins: [tailwindcss()]
  }
});