import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { Suspense } from 'react'
import DashboardWidgetLoader from '../../components/DashboardWidgetLoader'

// next/dynamic is mocked in vitest.setup.ts to return React.lazy(factory).
// remote/DashboardWidget is aliased in vitest.config.ts to __mocks__/DashboardWidget.tsx.

describe('DashboardWidgetLoader', () => {
  it('renders the DashboardWidget after loading', async () => {
    render(
      <Suspense fallback={<div>Loading…</div>}>
        <DashboardWidgetLoader />
      </Suspense>,
    )
    await waitFor(() => {
      expect(screen.getByTestId('dashboard-widget')).toBeInTheDocument()
    })
  })

  it('does not render the ProfileWidget', async () => {
    render(
      <Suspense fallback={null}>
        <DashboardWidgetLoader />
      </Suspense>,
    )
    await waitFor(() => {
      expect(screen.queryByTestId('profile-widget')).not.toBeInTheDocument()
    })
  })
})
