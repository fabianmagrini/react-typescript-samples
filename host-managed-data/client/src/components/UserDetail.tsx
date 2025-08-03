import type { User } from '../types/api'
import { Card } from './Card'

interface UserDetailProps {
  user: User | undefined
  isLoading: boolean
  error: Error | null
}

export function UserDetail({ user, isLoading, error }: UserDetailProps) {
  if (isLoading) {
    return (
      <Card>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <div className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
          Failed to load user: {error.message}
        </div>
      </Card>
    )
  }

  if (!user) {
    return (
      <Card>
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          Select a user to view details
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        User Details
      </h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {user.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Contact
            </h4>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <div>📞 {user.phone}</div>
              <div>🌐 {user.website}</div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Company
            </h4>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <div className="font-medium">{user.company.name}</div>
              <div className="italic">"{user.company.catchPhrase}"</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}