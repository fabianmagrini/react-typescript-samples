import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import DashboardPage from '../../app/(main)/dashboard/page'

// next/dynamic is mocked in vitest.setup.ts → React.lazy
// remote/DashboardWidget is aliased in vitest.config.ts → local stub
// DashboardPage wraps DashboardWidgetLoader in <Suspense>, so no wrapper needed here.

describe('DashboardPage', () => {
  it('renders the Dashboard heading', () => {
    render(<DashboardPage />)
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
  })

  it('renders the DashboardWidget after loading', async () => {
    render(<DashboardPage />)
    await waitFor(() => {
      expect(screen.getByTestId('dashboard-widget')).toBeInTheDocument()
    })
  })

  it('does not render the ProfileWidget', async () => {
    render(<DashboardPage />)
    await waitFor(() => {
      expect(screen.queryByTestId('profile-widget')).not.toBeInTheDocument()
    })
  })
})
