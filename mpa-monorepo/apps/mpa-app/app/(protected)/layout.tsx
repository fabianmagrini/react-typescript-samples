import { headers } from 'next/headers'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Nav from '@/components/nav/Nav'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect('/login')

  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? ''

  return (
    <div className="flex h-screen">
      <aside className="w-56 flex-shrink-0 bg-white border-r border-gray-200">
        <Nav currentPath={pathname} />
      </aside>
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  )
}
