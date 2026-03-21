import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
  resolve: {
    alias: {
      '@mfe-demo/nav-registry': path.resolve(
        __dirname,
        '../packages/nav-registry/src/index.ts',
      ),
    },
  },
});
