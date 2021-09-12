import { defineConfig } from 'vite';
import legacyPlugin from 'vite-plugin-legacy';

export default defineConfig({
  build: { sourcemap: true },
  plugins: [legacyPlugin({ corejs: true })],
  resolve: { alias: [{ find: '~', replacement: './src' }] },
});
