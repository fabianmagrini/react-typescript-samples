import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../api/client'

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => apiClient.getUsers(),
  })
}

export function useUser(id: number | null) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => apiClient.getUser(id!),
    enabled: !!id,
  })
}