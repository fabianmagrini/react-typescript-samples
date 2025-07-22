import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: [
    {
      command: 'cd host && npm start',
      port: 3000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'cd remote-legacy && npm start',
      port: 3001,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'cd remote-latest && npm start',
      port: 3002,
      reuseExistingServer: !process.env.CI,
    },
  ],
});