import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'mfe_profile',
      filename: 'remoteEntry.js',
      exposes: {
        './Profile': './src/Profile',
        './register': './src/register',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18' },
        'react-dom': { singleton: true, requiredVersion: '^18' },
        'react-router-dom': { singleton: true, requiredVersion: '^6' },
        '@mfe-demo/nav-registry': { singleton: true },
      },
    }),
  ],
  performance: {
    bundleAnalyze: process.env.ANALYZE ? {} : undefined,
  },
  server: {
    port: 3002,
  },
  html: {
    template: './src/index.html',
  },
});
