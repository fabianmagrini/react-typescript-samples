import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/rspack';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 3002,
  },
  dev: {
    assetPrefix: 'http://localhost:3002/',
  },
  output: {
    assetPrefix: 'http://localhost:3002/',
  },
  tools: {
    rspack: {
      plugins: [
        new ModuleFederationPlugin({
          name: 'remote_header',
          exposes: {
            './Header': './src/Header',
          },
          shared: {
            react: { singleton: true },
            'react-dom': { singleton: true },
          },
        }),
      ],
    },
  },
});