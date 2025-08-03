import { render, screen, fireEvent } from '@testing-library/react'
import { UserList } from '../UserList'
import { useAppStore } from '../../stores/appStore'
import type { User } from '../../types/api'

// Mock the store
vi.mock('../../stores/appStore', () => ({
  useAppStore: vi.fn()
}))

const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    website: 'johndoe.com',
    company: { name: 'Test Corp', catchPhrase: 'Testing is fun' }
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '098-765-4321',
    website: 'janesmith.com',
    company: { name: 'Demo Inc', catchPhrase: 'Demo all the things' }
  }
]

const mockSetSelectedUserId = vi.fn()

beforeEach(() => {
  vi.resetAllMocks()
  ;(useAppStore as any).mockReturnValue({
    selectedUserId: null,
    setSelectedUserId: mockSetSelectedUserId
  })
})

test('renders loading state', () => {
  render(<UserList users={[]} isLoading={true} error={null} />)
  
  expect(screen.getByText('Users')).toBeInTheDocument()
  // Check for loading skeleton
  expect(document.querySelectorAll('.animate-pulse')).toHaveLength(5)
})

test('renders error state', () => {
  const error = new Error('Failed to fetch')
  render(<UserList users={[]} isLoading={false} error={error} />)
  
  expect(screen.getByText('Users')).toBeInTheDocument()
  expect(screen.getByText('Failed to load users: Failed to fetch')).toBeInTheDocument()
})

test('renders users list', () => {
  render(<UserList users={mockUsers} isLoading={false} error={null} />)
  
  expect(screen.getByText('Users (2)')).toBeInTheDocument()
  expect(screen.getByText('John Doe')).toBeInTheDocument()
  expect(screen.getByText('john@example.com')).toBeInTheDocument()
  expect(screen.getByText('Test Corp')).toBeInTheDocument()
  expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  expect(screen.getByText('jane@example.com')).toBeInTheDocument()
  expect(screen.getByText('Demo Inc')).toBeInTheDocument()
})

test('handles user selection', () => {
  render(<UserList users={mockUsers} isLoading={false} error={null} />)
  
  const johnButton = screen.getByRole('button', { name: /john doe/i })
  fireEvent.click(johnButton)
  
  expect(mockSetSelectedUserId).toHaveBeenCalledWith(1)
})

test('highlights selected user', () => {
  ;(useAppStore as any).mockReturnValue({
    selectedUserId: 1,
    setSelectedUserId: mockSetSelectedUserId
  })
  
  render(<UserList users={mockUsers} isLoading={false} error={null} />)
  
  const johnButton = screen.getByRole('button', { name: /john doe/i })
  expect(johnButton).toHaveClass('bg-blue-100')
})