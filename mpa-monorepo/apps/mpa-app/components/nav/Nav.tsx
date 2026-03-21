import Link from 'next/link'
import { STUB_USER } from '@/lib/auth'

export default function Nav({ currentPath }: { currentPath: string }) {
  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/profile', label: 'Profile' },
  ]

  return (
    <nav className="h-full flex flex-col">
      <div className="px-4 py-6 border-b border-gray-200">
        <span className="text-lg font-semibold text-gray-900">MPA App</span>
      </div>

      <ul className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label }) => {
          const active = currentPath.startsWith(href)
          return (
            <li key={href}>
              <Link
                href={href}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>

      <div className="px-4 py-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-3">{STUB_USER.email}</p>
        <a
          href="/api/logout"
          className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Sign out
        </a>
      </div>
    </nav>
  )
}
