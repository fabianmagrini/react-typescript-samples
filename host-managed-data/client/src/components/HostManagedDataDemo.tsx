import { QueryClientProvider } from '@tanstack/react-query'
import { useAppStore } from '../stores/appStore'
import { useUsers, useUser } from '../hooks/useUsers'
import { usePosts, usePost } from '../hooks/usePosts'
import { UserList } from './UserList'
import { UserDetail } from './UserDetail'
import { PostList } from './PostList'
import { PostDetail } from './PostDetail'
import { queryClient } from '../lib/queryClient'

function DemoContent() {
  const { selectedUserId, selectedPostId, theme, toggleTheme } = useAppStore()

  // Host manages all data fetching
  const usersQuery = useUsers()
  const selectedUserQuery = useUser(selectedUserId)
  const postsQuery = usePosts(selectedUserId)
  const selectedPostQuery = usePost(selectedPostId)

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="p-6">
          <div className="mb-6 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Host-Managed Data Pattern Demo
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Demonstrates separation of data management (host) and UI rendering (children)
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-all duration-200 shadow-sm hover:shadow-md border border-blue-600 dark:border-blue-700"
            >
              {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Users Section */}
            <div className="space-y-6">
              <UserList
                users={usersQuery.data || []}
                isLoading={usersQuery.isLoading}
                error={usersQuery.error}
              />
              
              <UserDetail
                user={selectedUserQuery.data}
                isLoading={selectedUserQuery.isLoading}
                error={selectedUserQuery.error}
              />
            </div>

            {/* Posts Section */}
            <div className="space-y-6">
              <PostList
                posts={postsQuery.data || []}
                isLoading={postsQuery.isLoading}
                error={postsQuery.error}
              />
              
              <PostDetail
                post={selectedPostQuery.data}
                isLoading={selectedPostQuery.isLoading}
                error={selectedPostQuery.error}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HostManagedDataDemo() {
  return (
    <QueryClientProvider client={queryClient}>
      <DemoContent />
    </QueryClientProvider>
  )
}