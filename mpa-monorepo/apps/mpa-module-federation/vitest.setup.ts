import '@testing-library/jest-dom'
import React from 'react'
import { vi } from 'vitest'

// Mock next/dynamic so that dynamic imports resolve via React.lazy in tests.
// The remote/* aliases in vitest.config.ts point to local stubs, so the lazy
// import resolves immediately to the stub component.
vi.mock('next/dynamic', () => ({
  default: (factory: () => Promise<{ default: React.ComponentType<any> }>) =>
    React.lazy(factory),
}))
