import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../api/client'

export function usePosts(userId?: number | null) {
  return useQuery({
    queryKey: ['posts', userId],
    queryFn: () => apiClient.getPosts(userId || undefined),
  })
}

export function usePost(id: number | null) {
  return useQuery({
    queryKey: ['posts', 'detail', id],
    queryFn: () => apiClient.getPost(id!),
    enabled: !!id,
  })
}