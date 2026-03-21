import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Nav from '../../components/Nav'

describe('Nav', () => {
  describe('rendering', () => {
    it('renders the app title', () => {
      render(<Nav currentPage="dashboard" />)
      expect(screen.getByText('MPA · Module Federation')).toBeInTheDocument()
    })

    it('renders a Dashboard link', () => {
      render(<Nav currentPage="dashboard" />)
      expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument()
    })

    it('renders a Profile link', () => {
      render(<Nav currentPage="dashboard" />)
      expect(screen.getByRole('link', { name: 'Profile' })).toBeInTheDocument()
    })

    it('Dashboard link points to /dashboard', () => {
      render(<Nav currentPage="dashboard" />)
      expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/dashboard')
    })

    it('Profile link points to /profile', () => {
      render(<Nav currentPage="dashboard" />)
      expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute('href', '/profile')
    })

    it('shows the host port hint', () => {
      render(<Nav currentPage="dashboard" />)
      expect(screen.getByText(':4000')).toBeInTheDocument()
    })

    it('shows the remote port hint', () => {
      render(<Nav currentPage="dashboard" />)
      expect(screen.getByText(':4001')).toBeInTheDocument()
    })
  })

  describe('active state — dashboard page', () => {
    it('highlights the Dashboard link', () => {
      render(<Nav currentPage="dashboard" />)
      expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveClass('bg-blue-50')
      expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveClass('text-blue-700')
    })

    it('does not highlight the Profile link', () => {
      render(<Nav currentPage="dashboard" />)
      expect(screen.getByRole('link', { name: 'Profile' })).not.toHaveClass('bg-blue-50')
    })
  })

  describe('active state — profile page', () => {
    it('highlights the Profile link', () => {
      render(<Nav currentPage="profile" />)
      expect(screen.getByRole('link', { name: 'Profile' })).toHaveClass('bg-blue-50')
      expect(screen.getByRole('link', { name: 'Profile' })).toHaveClass('text-blue-700')
    })

    it('does not highlight the Dashboard link', () => {
      render(<Nav currentPage="profile" />)
      expect(screen.getByRole('link', { name: 'Dashboard' })).not.toHaveClass('bg-blue-50')
    })
  })
})
