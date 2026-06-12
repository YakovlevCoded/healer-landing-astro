// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://healer.health',
  integrations: [vue()],
  adapter: netlify(),
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
