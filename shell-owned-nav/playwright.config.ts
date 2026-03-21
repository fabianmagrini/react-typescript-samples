import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    actionTimeout: 10_000,
  },

  expect: {
    // Bootstrap fetches two remote register modules before first render —
    // allow up to 10 s for content to appear.
    timeout: 10_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Start remotes before the shell so the shell bootstrap can reach them.
  // Health-check URLs use the mf-manifest.json endpoint — always served by
  // the Module Federation plugin regardless of entry configuration.
  webServer: [
    {
      name: 'mfe-dashboard',
      command: 'npm run dev -w mfe-dashboard',
      url: 'http://localhost:3001/mf-manifest.json',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      stdout: 'ignore',
      stderr: 'pipe',
    },
    {
      name: 'mfe-profile',
      command: 'npm run dev -w mfe-profile',
      url: 'http://localhost:3002/mf-manifest.json',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      stdout: 'ignore',
      stderr: 'pipe',
    },
    {
      name: 'shell',
      command: 'npm run dev -w shell',
      url: 'http://localhost:3000',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      stdout: 'ignore',
      stderr: 'pipe',
    },
  ],
});
