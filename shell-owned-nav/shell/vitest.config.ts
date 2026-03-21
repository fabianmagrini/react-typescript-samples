import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    clearMocks: true,
    setupFiles: ['./src/test-setup.ts'],
  },
  resolve: {
    alias: {
      '@mfe-demo/nav-registry': path.resolve(
        __dirname,
        '../packages/nav-registry/src/index.ts',
      ),
      // Federated module paths are not resolvable by Vite in test mode.
      // Aliases point to stub components; vi.mock() in tests may override them.
      'mfe_dashboard/Dashboard': path.resolve(
        __dirname,
        'src/__mocks__/mfe_dashboard_Dashboard.tsx',
      ),
      'mfe_dashboard/register': path.resolve(
        __dirname,
        'src/__mocks__/mfe_dashboard_register.ts',
      ),
      'mfe_profile/Profile': path.resolve(
        __dirname,
        'src/__mocks__/mfe_profile_Profile.tsx',
      ),
      'mfe_profile/register': path.resolve(
        __dirname,
        'src/__mocks__/mfe_profile_register.ts',
      ),
    },
  },
});
