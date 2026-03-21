import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { Suspense } from 'react'
import ProfileWidgetLoader from '../../components/ProfileWidgetLoader'

// next/dynamic is mocked in vitest.setup.ts to return React.lazy(factory).
// remote/ProfileWidget is aliased in vitest.config.ts to __mocks__/ProfileWidget.tsx.

describe('ProfileWidgetLoader', () => {
  it('renders the ProfileWidget after loading', async () => {
    render(
      <Suspense fallback={<div>Loading…</div>}>
        <ProfileWidgetLoader />
      </Suspense>,
    )
    await waitFor(() => {
      expect(screen.getByTestId('profile-widget')).toBeInTheDocument()
    })
  })

  it('does not render the DashboardWidget', async () => {
    render(
      <Suspense fallback={null}>
        <ProfileWidgetLoader />
      </Suspense>,
    )
    await waitFor(() => {
      expect(screen.queryByTestId('dashboard-widget')).not.toBeInTheDocument()
    })
  })
})
