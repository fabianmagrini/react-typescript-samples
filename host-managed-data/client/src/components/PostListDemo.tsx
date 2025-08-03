import type { Post } from '../types/api'
import { Card } from './Card'
import { useState } from 'react'

interface PostListDemoProps {
  posts: Post[]
  isLoading: boolean
  error: Error | null
  selectedUserId?: number | null
  initialSelectedPostId?: number | null
}

export function PostListDemo({ 
  posts, 
  isLoading, 
  error, 
  selectedUserId = null,
  initialSelectedPostId = null 
}: PostListDemoProps) {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(initialSelectedPostId)

  if (isLoading) {
    return (
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Posts
        </h2>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
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
          Posts
        </h2>
        <div className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
          Failed to load posts: {error.message}
        </div>
      </Card>
    )
  }

  const title = selectedUserId 
    ? `Posts by User ${selectedUserId} (${posts.length})`
    : `All Posts (${posts.length})`

  return (
    <Card>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      
      {posts.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No posts available
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <button
              key={post.id}
              onClick={() => setSelectedPostId(post.id)}
              className={`w-full text-left p-4 rounded-md transition-all duration-200 ${
                selectedPostId === post.id
                  ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-300 dark:border-blue-600 border shadow-sm'
                  : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-gray-900 dark:text-white line-clamp-2">
                  {post.title}
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 ml-2 flex-shrink-0">
                  #{post.id}
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {post.body}
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                User {post.userId}
              </div>
            </button>
          ))}
        </div>
      )}
    </Card>
  )
}