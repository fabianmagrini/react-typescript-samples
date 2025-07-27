import { ReactNode } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <aside className="w-64 bg-white shadow-sm">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          </div>
          <nav className="mt-4">
            <div className="px-4 space-y-2">
              <a href="/dashboard" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Overview
              </a>
              <a href="/dashboard/analytics" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Analytics
              </a>
              <a href="/dashboard/users" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Users
              </a>
              <a href="/dashboard/settings" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                Settings
              </a>
            </div>
          </nav>
        </aside>
        
        <div className="flex-1 flex flex-col">
          <header className="bg-white shadow-sm">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                  Dashboard
                </h1>
                <div className="flex items-center space-x-4">
                  <button className="text-gray-500 hover:text-gray-700">
                    <span className="sr-only">View notifications</span>
                    🔔
                  </button>
                  <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}