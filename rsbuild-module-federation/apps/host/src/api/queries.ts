import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './client';
import type { User, DashboardStats } from '@mf/shared-types';

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const { data } = await apiClient.get<User>(`/users/${userId}`);
      return data;
    },
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      const { data } = await apiClient.get<DashboardStats>('/dashboard/stats');
      return data;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (user: Partial<User> & { id: string }) => {
      const { data } = await apiClient.put<User>(`/users/${user.id}`, user);
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user', data.id], data);
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};