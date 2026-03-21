import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'shell',
      remotes: {
        mfe_dashboard: 'mfe_dashboard@http://localhost:3001/mf-manifest.json',
        mfe_profile: 'mfe_profile@http://localhost:3002/mf-manifest.json',
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: '^18' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '^18' },
        'react-router-dom': { singleton: true, eager: true, requiredVersion: '^6' },
        '@mfe-demo/nav-registry': { singleton: true, eager: true },
      },
    }),
  ],
  source: {
    entry: {
      index: './src/main.tsx',
    },
  },
  server: {
    port: 3000,
  },
  html: {
    template: './src/index.html',
  },
});
