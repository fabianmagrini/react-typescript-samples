import { headers } from 'next/headers'
import Nav from '../../components/Nav'

// Main shell layout shared by /dashboard and /profile.
// Reads the x-pathname header (set by middleware) to determine the active nav
// item without making each page dynamic.
export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? ''
  const currentPage: 'dashboard' | 'profile' = pathname.startsWith('/profile')
    ? 'profile'
    : 'dashboard'

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Nav currentPage={currentPage} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
