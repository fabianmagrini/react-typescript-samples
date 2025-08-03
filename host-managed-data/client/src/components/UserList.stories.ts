import type { Meta, StoryObj } from '@storybook/react'
import { UserListDemo } from './UserListDemo'
import type { User } from '../types/api'

const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1-555-0123',
    website: 'john-doe.com',
    company: {
      name: 'Doe Enterprises',
      catchPhrase: 'Innovation at its finest',
      bs: 'transform global solutions'
    },
    address: {
      street: '123 Main St',
      suite: 'Apt 4B',
      city: 'New York',
      zipcode: '10001',
      geo: { lat: '40.7128', lng: '-74.0060' }
    }
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1-555-0456',
    website: 'jane-smith.io',
    company: {
      name: 'Smith & Co',
      catchPhrase: 'Building tomorrow today',
      bs: 'streamline innovative platforms'
    },
    address: {
      street: '456 Oak Ave',
      suite: 'Suite 200',
      city: 'Los Angeles',
      zipcode: '90210',
      geo: { lat: '34.0522', lng: '-118.2437' }
    }
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '+1-555-0789',
    website: 'bob-johnson.net',
    company: {
      name: 'Johnson Industries',
      catchPhrase: 'Excellence in every detail',
      bs: 'optimize scalable systems'
    },
    address: {
      street: '789 Pine St',
      suite: 'Floor 3',
      city: 'Chicago',
      zipcode: '60601',
      geo: { lat: '41.8781', lng: '-87.6298' }
    }
  }
]

const meta: Meta<typeof UserListDemo> = {
  title: 'Components/UserList',
  component: UserListDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    users: mockUsers,
    isLoading: false,
    error: null,
    initialSelectedUserId: 1,
  },
}

export const Loading: Story = {
  args: {
    users: [],
    isLoading: true,
    error: null,
  },
}

export const Error: Story = {
  args: {
    users: [],
    isLoading: false,
    error: { name: 'Error', message: 'Failed to fetch users from the server' } as Error,
  },
}

export const SingleUser: Story = {
  args: {
    users: [mockUsers[0]],
    isLoading: false,
    error: null,
    initialSelectedUserId: 1,
  },
}

export const Empty: Story = {
  args: {
    users: [],
    isLoading: false,
    error: null,
  },
}