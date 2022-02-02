import { defineConfig } from 'vite';

import viteConfig from './vite.config';

export default defineConfig({
  ...viteConfig,
  test: {
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}'],
    environment: 'jsdom',
  },
});
