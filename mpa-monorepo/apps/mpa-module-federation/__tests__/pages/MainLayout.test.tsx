import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as nextHeaders from 'next/headers'
import MainLayout from '../../app/(main)/layout'

// Mock next/headers so the async server component can be tested without a
// real Next.js request context.
vi.mock('next/headers', () => ({
  headers: vi.fn(),
}))

function mockPathname(pathname: string) {
  vi.mocked(nextHeaders.headers).mockResolvedValue({
    get: (name: string) => (name === 'x-pathname' ? pathname : null),
  } as any)
}

describe('MainLayout', () => {
  describe('active nav item', () => {
    it('highlights Dashboard for /dashboard', async () => {
      mockPathname('/dashboard')
      render(await MainLayout({ children: <div /> }))
      expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveClass('bg-blue-50')
      expect(screen.getByRole('link', { name: 'Profile' })).not.toHaveClass('bg-blue-50')
    })

    it('highlights Profile for /profile', async () => {
      mockPathname('/profile')
      render(await MainLayout({ children: <div /> }))
      expect(screen.getByRole('link', { name: 'Profile' })).toHaveClass('bg-blue-50')
      expect(screen.getByRole('link', { name: 'Dashboard' })).not.toHaveClass('bg-blue-50')
    })

    it('defaults to dashboard when x-pathname is absent', async () => {
      vi.mocked(nextHeaders.headers).mockResolvedValue({
        get: () => null,
      } as any)
      render(await MainLayout({ children: <div /> }))
      expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveClass('bg-blue-50')
    })

    it('defaults to dashboard for unrecognised paths', async () => {
      mockPathname('/settings')
      render(await MainLayout({ children: <div /> }))
      expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveClass('bg-blue-50')
    })
  })

  it('renders children inside the main element', async () => {
    mockPathname('/dashboard')
    render(await MainLayout({ children: <div data-testid="page-content">content</div> }))
    expect(screen.getByTestId('page-content')).toBeInTheDocument()
  })
})
