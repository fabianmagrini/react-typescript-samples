import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

const dashboardUrl = process.env.MFE_DASHBOARD_URL ?? 'http://localhost:3001';
const profileUrl = process.env.MFE_PROFILE_URL ?? 'http://localhost:3002';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'shell',
      remotes: {
        mfe_dashboard: `mfe_dashboard@${dashboardUrl}/mf-manifest.json`,
        mfe_profile: `mfe_profile@${profileUrl}/mf-manifest.json`,
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
  performance: {
    bundleAnalyze: process.env.ANALYZE ? {} : undefined,
  },
  server: {
    port: 3000,
  },
  html: {
    template: './src/index.html',
    templateParameters: {
      mfeDashboardUrl: dashboardUrl,
      mfeProfileUrl: profileUrl,
    },
  },
});
