import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/rspack';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 3003,
  },
  dev: {
    assetPrefix: 'http://localhost:3003/',
  },
  output: {
    assetPrefix: 'http://localhost:3003/',
  },
  tools: {
    rspack: {
      plugins: [
        new ModuleFederationPlugin({
          name: 'remote_footer',
          exposes: {
            './Footer': './src/Footer',
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