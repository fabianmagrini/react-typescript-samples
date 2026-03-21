import { Suspense } from 'react'
import DashboardWidgetLoader from '../../../components/DashboardWidgetLoader'
import WidgetFallback from '../../../components/WidgetFallback'

export default function DashboardPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
      <Suspense fallback={<WidgetFallback />}>
        <DashboardWidgetLoader />
      </Suspense>
    </>
  )
}
