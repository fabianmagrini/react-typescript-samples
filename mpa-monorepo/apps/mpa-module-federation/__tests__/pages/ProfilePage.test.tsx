import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import ProfilePage from '../../app/(main)/profile/page'

// next/dynamic is mocked in vitest.setup.ts → React.lazy
// remote/ProfileWidget is aliased in vitest.config.ts → local stub
// ProfilePage wraps ProfileWidgetLoader in <Suspense>, so no wrapper needed here.

describe('ProfilePage', () => {
  it('renders the Profile heading', () => {
    render(<ProfilePage />)
    expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument()
  })

  it('renders the ProfileWidget after loading', async () => {
    render(<ProfilePage />)
    await waitFor(() => {
      expect(screen.getByTestId('profile-widget')).toBeInTheDocument()
    })
  })

  it('does not render the DashboardWidget', async () => {
    render(<ProfilePage />)
    await waitFor(() => {
      expect(screen.queryByTestId('dashboard-widget')).not.toBeInTheDocument()
    })
  })
})
