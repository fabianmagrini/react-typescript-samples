import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    exclude: ['node_modules', 'e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['app/**', 'components/**'],
      exclude: ['__mocks__/**', '**/*.d.ts'],
    },
  },
  resolve: {
    alias: {
      // Map federated remote imports to local stubs so Vite can resolve them
      // at transform time during unit tests.
      'remote/DashboardWidget': path.resolve(__dirname, '__mocks__/DashboardWidget.tsx'),
      'remote/ProfileWidget': path.resolve(__dirname, '__mocks__/ProfileWidget.tsx'),
    },
  },
})
