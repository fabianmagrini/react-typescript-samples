import { render, screen, waitFor } from '@testing-library/react'
import { HostManagedDataDemo } from '../HostManagedDataDemo'

// Mock fetch for the API calls
global.fetch = vi.fn()

beforeEach(() => {
  vi.resetAllMocks()
  
  // Mock API responses
  ;(fetch as any).mockImplementation((url: string) => {
    if (url.includes('/api/users')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '123-456-7890',
            website: 'johndoe.com',
            company: { name: 'Test Corp', catchPhrase: 'Testing is fun' }
          }
        ])
      })
    }
    if (url.includes('/api/posts')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          {
            id: 1,
            userId: 1,
            title: 'Test Post',
            body: 'This is a test post'
          }
        ])
      })
    }
    return Promise.reject(new Error('Unknown endpoint'))
  })
})

test('renders host managed data demo', async () => {
  render(<HostManagedDataDemo />)
  
  // Check if main title is rendered
  expect(screen.getByText('Host-Managed Data Pattern Demo')).toBeInTheDocument()
  
  // Check if description is rendered
  expect(screen.getByText('Demonstrates separation of data management (host) and UI rendering (children)')).toBeInTheDocument()
  
  // Check if theme toggle button is rendered
  expect(screen.getByText('🌙 Dark Mode')).toBeInTheDocument()
  
  // Wait for data to load and check if sections are rendered
  await waitFor(() => {
    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('Posts')).toBeInTheDocument()
  })
})