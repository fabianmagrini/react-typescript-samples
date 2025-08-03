import type { Post } from '../types/api'
import { Card } from './Card'

interface PostDetailProps {
  post: Post | undefined
  isLoading: boolean
  error: Error | null
}

export function PostDetail({ post, isLoading, error }: PostDetailProps) {
  if (isLoading) {
    return (
      <Card>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
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
          Failed to load post: {error.message}
        </div>
      </Card>
    )
  }

  if (!post) {
    return (
      <Card>
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          Select a post to view details
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Post Details
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          ID: {post.id} | User: {post.userId}
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            {post.title}
          </h3>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
            Content
          </h4>
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {post.body}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div>📝 Post #{post.id}</div>
            <div>👤 By User {post.userId}</div>
          </div>
        </div>
      </div>
    </Card>
  )
}