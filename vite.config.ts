import { defineConfig } from 'vite';
import legacyPlugin from '@vitejs/plugin-legacy';

export default defineConfig({
  build: { sourcemap: true },
  plugins: [legacyPlugin()],
  resolve: { alias: [{ find: 'src', replacement: './src' }] },
});
