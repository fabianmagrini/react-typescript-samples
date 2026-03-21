'use client'

// next/dynamic with ssr:false prevents the server from attempting to render
// the federated widget — the remote only publishes a browser bundle.
// The parent page provides a <Suspense> boundary with WidgetFallback.
import dynamic from 'next/dynamic'
import WidgetErrorBoundary from './WidgetErrorBoundary'

const DashboardWidget = dynamic(() => import('remote/DashboardWidget'), { ssr: false })

export default function DashboardWidgetLoader() {
  return (
    <WidgetErrorBoundary>
      <DashboardWidget />
    </WidgetErrorBoundary>
  )
}
