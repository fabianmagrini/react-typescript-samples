type Page = 'dashboard' | 'profile'

const NAV_ITEMS: { id: Page; label: string; href: string }[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { id: 'profile', label: 'Profile', href: '/profile' },
]

export default function Nav({ currentPage }: { currentPage: Page }) {
  return (
    <aside className="w-56 shrink-0 border-r border-gray-200 bg-white flex flex-col h-screen sticky top-0">
      <div className="px-4 py-5 border-b border-gray-100">
        <span className="text-base font-semibold text-gray-900">MPA · Module Federation</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ id, label, href }) => (
          <a
            key={id}
            href={href}
            className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentPage === id
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            {label}
          </a>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Host: <span className="font-mono">:4000</span>
          <br />
          Remote: <span className="font-mono">:4001</span>
        </p>
      </div>
    </aside>
  )
}
