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
    port: 3001,
  },
  dev: {
    assetPrefix: 'http://localhost:3001/',
  },
  tools: {
    rspack: {
      plugins: [
        new ModuleFederationPlugin({
          name: 'remote',
          filename: 'remoteEntry.js',
          exposes: {
            './ProductList': './src/features/products/components/ProductList',
            './OrderHistory': './src/features/orders/components/OrderHistory',
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
          dts: false,
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