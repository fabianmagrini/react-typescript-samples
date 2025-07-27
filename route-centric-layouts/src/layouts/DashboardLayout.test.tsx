import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { DashboardLayout } from './DashboardLayout'

describe('DashboardLayout', () => {
  it('renders correctly with children', () => {
    render(
      <DashboardLayout>
        <div>Test dashboard content</div>
      </DashboardLayout>
    )
    
    expect(screen.getByText('Test dashboard content')).toBeInTheDocument()
  })

  it('renders the dashboard header', () => {
    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    )
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('renders sidebar navigation', () => {
    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    )
    
    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('has correct sidebar navigation links', () => {
    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    )
    
    const overviewLink = screen.getByText('Overview').closest('a')
    const analyticsLink = screen.getByText('Analytics').closest('a')
    const usersLink = screen.getByText('Users').closest('a')
    const settingsLink = screen.getByText('Settings').closest('a')
    
    expect(overviewLink).toHaveAttribute('href', '/dashboard')
    expect(analyticsLink).toHaveAttribute('href', '/dashboard/analytics')
    expect(usersLink).toHaveAttribute('href', '/dashboard/users')
    expect(settingsLink).toHaveAttribute('href', '/dashboard/settings')
  })

  it('renders notification button', () => {
    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    )
    
    const notificationButton = screen.getByRole('button')
    expect(notificationButton).toBeInTheDocument()
    expect(notificationButton).toHaveTextContent('🔔')
  })

  it('has correct layout structure', () => {
    render(
      <DashboardLayout>
        <div data-testid="dashboard-content">Content</div>
      </DashboardLayout>
    )
    
    const content = screen.getByTestId('dashboard-content')
    const main = content.closest('main')
    const aside = screen.getByRole('complementary') || document.querySelector('aside')
    
    expect(main).toHaveClass('flex-1', 'p-6')
    expect(aside).toHaveClass('w-64', 'bg-white', 'shadow-sm')
  })

  it('has responsive layout classes', () => {
    const { container } = render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    )
    
    const layoutContainer = container.firstChild
    expect(layoutContainer).toHaveClass('min-h-screen', 'bg-gray-100')
    
    const flexContainer = container.querySelector('.flex')
    expect(flexContainer).toBeInTheDocument()
  })
})