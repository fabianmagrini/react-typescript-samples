import type { User } from '../types/api'
import { useAppStore } from '../stores/appStore'
import { Card } from './Card'

interface UserListProps {
  users: User[]
  isLoading: boolean
  error: Error | null
}

export function UserList({ users, isLoading, error }: UserListProps) {
  const { selectedUserId, setSelectedUserId } = useAppStore()

  if (isLoading) {
    return (
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Users
        </h2>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
            />
          ))}
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Users
        </h2>
        <div className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
          Failed to load users: {error.message}
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Users ({users.length})
      </h2>
      <div className="space-y-2">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => setSelectedUserId(user.id)}
            className={`w-full text-left p-3 rounded-md transition-all duration-200 ${
              selectedUserId === user.id
                ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-300 dark:border-blue-600 border shadow-sm'
                : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-600'
            }`}
          >
            <div className="font-medium text-gray-900 dark:text-white">
              {user.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500">
              {user.company.name}
            </div>
          </button>
        ))}
      </div>
    </Card>
  )
}