import paraglide from '@inlang/paraglide-astro';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  i18n: {
    locales: ['it', 'en', 'fr', 'es', 'pt-br'],
    defaultLocale: 'it',
  },
  integrations: [
    react(),
    tailwind(),
    mdx(),
    paraglide({
      // recommended settings
      project: './project.inlang',
      outdir: './src/paraglide', //where your files should be
    })
  ],
  image: {
    domains: ["aiellohotels.com"]
  }
});