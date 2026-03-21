'use client'

// next/dynamic with ssr:false prevents the server from attempting to render
// the federated widget — the remote only publishes a browser bundle.
// The parent page provides a <Suspense> boundary with WidgetFallback.
import dynamic from 'next/dynamic'
import WidgetErrorBoundary from './WidgetErrorBoundary'

const ProfileWidget = dynamic(() => import('remote/ProfileWidget'), { ssr: false })

export default function ProfileWidgetLoader() {
  return (
    <WidgetErrorBoundary>
      <ProfileWidget />
    </WidgetErrorBoundary>
  )
}
