import type { Meta, StoryObj } from '@storybook/react'
import { PostListDemo } from './PostListDemo'
import type { Post } from '../types/api'

const mockPosts: Post[] = [
  {
    id: 1,
    userId: 1,
    title: 'Understanding React Hooks',
    body: 'React Hooks allow you to use state and other React features without writing a class. They provide a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle.'
  },
  {
    id: 2,
    userId: 1,
    title: 'TypeScript Best Practices',
    body: 'TypeScript is a powerful superset of JavaScript that adds static type definitions. This guide covers the essential best practices for writing maintainable and type-safe code.'
  },
  {
    id: 3,
    userId: 2,
    title: 'Modern CSS with Tailwind',
    body: 'Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without ever leaving your HTML.'
  },
  {
    id: 4,
    userId: 2,
    title: 'Building Scalable Applications',
    body: 'Learn how to architect applications that can grow with your business needs. This comprehensive guide covers patterns, tools, and techniques for building scalable systems.'
  }
]

const meta: Meta<typeof PostListDemo> = {
  title: 'Components/PostList',
  component: PostListDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    posts: mockPosts,
    isLoading: false,
    error: null,
    initialSelectedPostId: 1,
  },
}

export const FilteredByUser: Story = {
  args: {
    posts: mockPosts.filter(p => p.userId === 1),
    isLoading: false,
    error: null,
    selectedUserId: 1,
    initialSelectedPostId: 2,
  },
}

export const Loading: Story = {
  args: {
    posts: [],
    isLoading: true,
    error: null,
  },
}

export const Error: Story = {
  args: {
    posts: [],
    isLoading: false,
    error: { name: 'Error', message: 'Network connection failed' } as Error,
  },
}

export const Empty: Story = {
  args: {
    posts: [],
    isLoading: false,
    error: null,
  },
}

export const LongContent: Story = {
  args: {
    posts: [
      {
        id: 1,
        userId: 1,
        title: 'This is an extremely long post title that should demonstrate how the component handles text overflow and line clamping in the UI',
        body: 'This post has a very long title and body to test how the component handles text wrapping and truncation. The title should be clamped to maintain a consistent layout. This content continues for several more sentences to really test the truncation behavior and ensure that the component remains visually appealing even with extensive text content that would otherwise overflow the container.'
      }
    ],
    isLoading: false,
    error: null,
  },
}