import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/rspack';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 3001,
  },
  dev: {
    assetPrefix: 'http://localhost:3001/',
  },
  output: {
    assetPrefix: 'http://localhost:3001/',
  },
  tools: {
    rspack: {
      plugins: [
        new ModuleFederationPlugin({
          name: 'host',
          remotes: {
            'remote-header': 'remote_header@http://localhost:3002/static/js/remote_header.js',
            'remote-footer': 'remote_footer@http://localhost:3003/static/js/remote_footer.js',
          },
          shared: {
            react: { singleton: true, eager: true },
            'react-dom': { singleton: true, eager: true },
          },
        }),
      ],
    },
  },
});