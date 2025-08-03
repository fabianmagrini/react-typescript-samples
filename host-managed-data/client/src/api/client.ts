import type { User, Post } from '../types/api'

const API_BASE_URL = '/api'

class ApiClient {
  private async request<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`)
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }
    
    return response.json()
  }

  async getUsers(): Promise<User[]> {
    return this.request<User[]>('/users')
  }

  async getUser(id: number): Promise<User> {
    return this.request<User>(`/users/${id}`)
  }

  async getPosts(userId?: number): Promise<Post[]> {
    const endpoint = userId ? `/posts?userId=${userId}` : '/posts'
    return this.request<Post[]>(endpoint)
  }

  async getPost(id: number): Promise<Post> {
    return this.request<Post>(`/posts/${id}`)
  }
}

export const apiClient = new ApiClient()