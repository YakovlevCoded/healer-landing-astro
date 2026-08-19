// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';

export default defineConfig({
  site: 'https://bevita.app',
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [vue(), sitemap()],
  adapter: netlify(),
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    },
    // External citation links open in a new tab with safe rel attributes.
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
    ],
  }
});
