import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DashboardIsland from '@/components/islands/DashboardIsland'

describe('DashboardIsland', () => {
  describe('initial render', () => {
    it('renders the 7d range selected by default', () => {
      render(<DashboardIsland />)
      const btn = screen.getByRole('button', { name: '7d' })
      expect(btn).toHaveClass('bg-white')
    })

    it('renders all range buttons', () => {
      render(<DashboardIsland />)
      expect(screen.getByRole('button', { name: '7d' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '30d' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '90d' })).toBeInTheDocument()
    })

    it('renders 7d metric values', () => {
      render(<DashboardIsland />)
      expect(screen.getByText('1,284')).toBeInTheDocument()
      expect(screen.getByText('$8,430')).toBeInTheDocument()
      expect(screen.getByText('38')).toBeInTheDocument()
      expect(screen.getByText('2.4h')).toBeInTheDocument()
    })

    it('renders all metric labels', () => {
      render(<DashboardIsland />)
      expect(screen.getByText('Active Users')).toBeInTheDocument()
      expect(screen.getByText('Revenue')).toBeInTheDocument()
      expect(screen.getByText('Tickets Opened')).toBeInTheDocument()
      expect(screen.getByText('Avg. Response Time')).toBeInTheDocument()
    })

    it('renders the recent activity section', () => {
      render(<DashboardIsland />)
      expect(screen.getByText('Recent Activity')).toBeInTheDocument()
    })

    it('renders all activity entries', () => {
      render(<DashboardIsland />)
      expect(screen.getByText('Alice Chen')).toBeInTheDocument()
      expect(screen.getByText('Bob Martinez')).toBeInTheDocument()
      expect(screen.getByText('Carol Lee')).toBeInTheDocument()
      expect(screen.getByText('David Kim')).toBeInTheDocument()
      expect(screen.getByText('Eve Patel')).toBeInTheDocument()
    })
  })

  describe('range switching', () => {
    it('shows 30d metrics after clicking 30d', async () => {
      render(<DashboardIsland />)
      await userEvent.click(screen.getByRole('button', { name: '30d' }))
      expect(screen.getByText('5,102')).toBeInTheDocument()
      expect(screen.getByText('$34,820')).toBeInTheDocument()
      expect(screen.getByText('141')).toBeInTheDocument()
      expect(screen.getByText('2.1h')).toBeInTheDocument()
    })

    it('shows 90d metrics after clicking 90d', async () => {
      render(<DashboardIsland />)
      await userEvent.click(screen.getByRole('button', { name: '90d' }))
      expect(screen.getByText('14,900')).toBeInTheDocument()
      expect(screen.getByText('$102,310')).toBeInTheDocument()
      expect(screen.getByText('398')).toBeInTheDocument()
      expect(screen.getByText('1.9h')).toBeInTheDocument()
    })

    it('switches back to 7d from 30d', async () => {
      render(<DashboardIsland />)
      await userEvent.click(screen.getByRole('button', { name: '30d' }))
      await userEvent.click(screen.getByRole('button', { name: '7d' }))
      expect(screen.getByText('1,284')).toBeInTheDocument()
    })

    it('highlights the active range button', async () => {
      render(<DashboardIsland />)
      await userEvent.click(screen.getByRole('button', { name: '30d' }))
      expect(screen.getByRole('button', { name: '30d' })).toHaveClass('bg-white')
      expect(screen.getByRole('button', { name: '7d' })).not.toHaveClass('bg-white')
    })

    it('removes 7d metrics when switching to 30d', async () => {
      render(<DashboardIsland />)
      await userEvent.click(screen.getByRole('button', { name: '30d' }))
      expect(screen.queryByText('1,284')).not.toBeInTheDocument()
    })
  })

  describe('change indicators', () => {
    it('renders positive change in green', () => {
      render(<DashboardIsland />)
      const change = screen.getByText('+4.2%')
      expect(change).toHaveClass('text-green-600')
    })

    it('renders negative change in red', () => {
      render(<DashboardIsland />)
      const change = screen.getByText('-12%')
      expect(change).toHaveClass('text-red-500')
    })
  })
})
