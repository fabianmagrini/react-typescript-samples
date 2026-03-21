import { Suspense } from 'react'
import ProfileWidgetLoader from '../../../components/ProfileWidgetLoader'
import WidgetFallback from '../../../components/WidgetFallback'

export default function ProfilePage() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Profile</h1>
      <Suspense fallback={<WidgetFallback />}>
        <ProfileWidgetLoader />
      </Suspense>
    </>
  )
}
