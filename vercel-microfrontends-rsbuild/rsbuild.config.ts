import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 3000,
  },
  dev: {
    assetPrefix: 'http://localhost:3000/',
  },
  output: {
    assetPrefix: 'http://localhost:3000/',
  },
});