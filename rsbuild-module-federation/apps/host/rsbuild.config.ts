import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export default defineConfig({
  plugins: [pluginReact(), pluginTypeCheck()],
  source: {
    entry: {
      index: './src/main.tsx',
    },
  },
  server: {
    port: 3000,
  },
  dev: {
    // Ensure dev server can handle module federation
    assetPrefix: 'http://localhost:3000/',
  },
  tools: {
    rspack: {
      plugins: [
        new ModuleFederationPlugin({
          name: 'host',
          remotes: {
            remote: 'remote@http://localhost:3001/remoteEntry.js',
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: '^18.2.0',
            },
            'react-dom': {
              singleton: true,
              requiredVersion: '^18.2.0',
            },
            'react-router-dom': {
              singleton: true,
            },
          },
        }),
      ],
    },
    postcss: {
      postcssOptions: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
  },
});