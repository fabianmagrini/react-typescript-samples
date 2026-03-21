import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DashboardWidget from '../../components/DashboardWidget'

describe('DashboardWidget', () => {
  describe('initial render', () => {
    it('renders all three range buttons', () => {
      render(<DashboardWidget />)
      expect(screen.getByRole('button', { name: '7d' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '30d' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '90d' })).toBeInTheDocument()
    })

    it('selects 7d range by default', () => {
      render(<DashboardWidget />)
      expect(screen.getByRole('button', { name: '7d' })).toHaveClass('bg-white')
    })

    it('does not highlight 30d or 90d on initial render', () => {
      render(<DashboardWidget />)
      expect(screen.getByRole('button', { name: '30d' })).not.toHaveClass('bg-white')
      expect(screen.getByRole('button', { name: '90d' })).not.toHaveClass('bg-white')
    })

    it('renders all metric labels', () => {
      render(<DashboardWidget />)
      expect(screen.getByText('Active Users')).toBeInTheDocument()
      expect(screen.getByText('Revenue')).toBeInTheDocument()
      expect(screen.getByText('Tickets Opened')).toBeInTheDocument()
      expect(screen.getByText('Avg. Response Time')).toBeInTheDocument()
    })

    it('renders 7d metric values', () => {
      render(<DashboardWidget />)
      expect(screen.getByText('1,284')).toBeInTheDocument()
      expect(screen.getByText('$8,430')).toBeInTheDocument()
      expect(screen.getByText('38')).toBeInTheDocument()
      expect(screen.getByText('2.4h')).toBeInTheDocument()
    })

    it('renders the Recent Activity section heading', () => {
      render(<DashboardWidget />)
      expect(screen.getByText('Recent Activity')).toBeInTheDocument()
    })

    it('renders all five activity entries', () => {
      render(<DashboardWidget />)
      expect(screen.getByText('Alice Chen')).toBeInTheDocument()
      expect(screen.getByText('Bob Martinez')).toBeInTheDocument()
      expect(screen.getByText('Carol Lee')).toBeInTheDocument()
      expect(screen.getByText('David Kim')).toBeInTheDocument()
      expect(screen.getByText('Eve Patel')).toBeInTheDocument()
    })

    it('renders activity timestamps', () => {
      render(<DashboardWidget />)
      expect(screen.getByText('2m ago')).toBeInTheDocument()
      expect(screen.getByText('14m ago')).toBeInTheDocument()
      expect(screen.getByText('1h ago')).toBeInTheDocument()
      expect(screen.getByText('2h ago')).toBeInTheDocument()
      expect(screen.getByText('3h ago')).toBeInTheDocument()
    })

    it('renders activity action descriptions', () => {
      render(<DashboardWidget />)
      expect(screen.getByText(/Updated billing info/)).toBeInTheDocument()
      expect(screen.getByText(/Opened support ticket #482/)).toBeInTheDocument()
      expect(screen.getByText(/Upgraded to Pro plan/)).toBeInTheDocument()
      expect(screen.getByText(/Exported report/)).toBeInTheDocument()
      expect(screen.getByText(/Invited 3 team members/)).toBeInTheDocument()
    })
  })

  describe('range switching', () => {
    it('shows 30d metrics after clicking 30d', async () => {
      render(<DashboardWidget />)
      await userEvent.click(screen.getByRole('button', { name: '30d' }))
      expect(screen.getByText('5,102')).toBeInTheDocument()
      expect(screen.getByText('$34,820')).toBeInTheDocument()
      expect(screen.getByText('141')).toBeInTheDocument()
      expect(screen.getByText('2.1h')).toBeInTheDocument()
    })

    it('shows 90d metrics after clicking 90d', async () => {
      render(<DashboardWidget />)
      await userEvent.click(screen.getByRole('button', { name: '90d' }))
      expect(screen.getByText('14,900')).toBeInTheDocument()
      expect(screen.getByText('$102,310')).toBeInTheDocument()
      expect(screen.getByText('398')).toBeInTheDocument()
      expect(screen.getByText('1.9h')).toBeInTheDocument()
    })

    it('switches back from 30d to 7d', async () => {
      render(<DashboardWidget />)
      await userEvent.click(screen.getByRole('button', { name: '30d' }))
      await userEvent.click(screen.getByRole('button', { name: '7d' }))
      expect(screen.getByText('1,284')).toBeInTheDocument()
    })

    it('switches back from 90d to 7d', async () => {
      render(<DashboardWidget />)
      await userEvent.click(screen.getByRole('button', { name: '90d' }))
      await userEvent.click(screen.getByRole('button', { name: '7d' }))
      expect(screen.getByText('1,284')).toBeInTheDocument()
    })

    it('highlights the newly selected range button', async () => {
      render(<DashboardWidget />)
      await userEvent.click(screen.getByRole('button', { name: '30d' }))
      expect(screen.getByRole('button', { name: '30d' })).toHaveClass('bg-white')
    })

    it('removes highlight from the previously selected range button', async () => {
      render(<DashboardWidget />)
      await userEvent.click(screen.getByRole('button', { name: '30d' }))
      expect(screen.getByRole('button', { name: '7d' })).not.toHaveClass('bg-white')
    })

    it('removes 7d values when switching to 30d', async () => {
      render(<DashboardWidget />)
      await userEvent.click(screen.getByRole('button', { name: '30d' }))
      expect(screen.queryByText('1,284')).not.toBeInTheDocument()
      expect(screen.queryByText('$8,430')).not.toBeInTheDocument()
    })

    it('removes 30d values when switching to 90d', async () => {
      render(<DashboardWidget />)
      await userEvent.click(screen.getByRole('button', { name: '30d' }))
      await userEvent.click(screen.getByRole('button', { name: '90d' }))
      expect(screen.queryByText('5,102')).not.toBeInTheDocument()
      expect(screen.queryByText('$34,820')).not.toBeInTheDocument()
    })

    it('keeps metric labels visible across range changes', async () => {
      render(<DashboardWidget />)
      await userEvent.click(screen.getByRole('button', { name: '90d' }))
      expect(screen.getByText('Active Users')).toBeInTheDocument()
      expect(screen.getByText('Revenue')).toBeInTheDocument()
    })

    it('keeps activity feed visible across range changes', async () => {
      render(<DashboardWidget />)
      await userEvent.click(screen.getByRole('button', { name: '90d' }))
      expect(screen.getByText('Alice Chen')).toBeInTheDocument()
      expect(screen.getByText('Recent Activity')).toBeInTheDocument()
    })
  })

  describe('change indicators', () => {
    it('renders a positive change value in green', () => {
      render(<DashboardWidget />)
      expect(screen.getByText('+4.2%')).toHaveClass('text-green-600')
    })

    it('renders a negative change value in red', () => {
      render(<DashboardWidget />)
      expect(screen.getByText('-12%')).toHaveClass('text-red-500')
    })

    it('renders 30d positive change in green', async () => {
      render(<DashboardWidget />)
      await userEvent.click(screen.getByRole('button', { name: '30d' }))
      expect(screen.getByText('+11%')).toHaveClass('text-green-600')
    })

    it('renders 30d negative change in red', async () => {
      render(<DashboardWidget />)
      await userEvent.click(screen.getByRole('button', { name: '30d' }))
      expect(screen.getByText('-14%')).toHaveClass('text-red-500')
    })
  })
})
