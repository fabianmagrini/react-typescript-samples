import type { Meta, StoryObj } from '@storybook/react'
import { PostDetail } from './PostDetail'
import type { Post } from '../types/api'

const mockPost: Post = {
  id: 1,
  userId: 1,
  title: 'Understanding React Hooks',
  body: 'React Hooks allow you to use state and other React features without writing a class. They provide a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle.\n\nHooks are a new addition in React 16.8. They let you use state and other React features without writing a class component. This is particularly useful for functional components that need to manage state or perform side effects.'
}

const longPost: Post = {
  id: 2,
  userId: 2,
  title: 'Building Scalable Web Applications with Modern JavaScript Frameworks and Best Practices',
  body: 'Building scalable web applications requires careful consideration of architecture, performance, and maintainability. In this comprehensive guide, we will explore the essential patterns and practices that enable teams to build applications that can grow with their business needs.\n\nFirst, let\'s discuss the importance of component-based architecture. By breaking down complex user interfaces into smaller, reusable components, we can create more maintainable and testable code. This approach also enables better collaboration between team members and makes it easier to onboard new developers.\n\nSecond, we need to consider state management patterns. As applications grow in complexity, managing state becomes increasingly challenging. Tools like Redux, Zustand, and Context API provide different approaches to solving this problem, each with their own trade-offs.\n\nFinally, performance optimization becomes crucial as applications scale. This includes code splitting, lazy loading, memoization, and efficient data fetching strategies. By implementing these techniques early in the development process, we can ensure that our applications remain fast and responsive as they grow.'
}

const meta: Meta<typeof PostDetail> = {
  title: 'Components/PostDetail',
  component: PostDetail,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    post: mockPost,
    isLoading: false,
    error: null,
  },
}

export const LongContent: Story = {
  args: {
    post: longPost,
    isLoading: false,
    error: null,
  },
}

export const Loading: Story = {
  args: {
    post: undefined,
    isLoading: true,
    error: null,
  },
}

export const Error: Story = {
  args: {
    post: undefined,
    isLoading: false,
    error: { name: 'Error', message: 'Post not found' } as Error,
  },
}

export const NoSelection: Story = {
  args: {
    post: undefined,
    isLoading: false,
    error: null,
  },
}

export const ShortPost: Story = {
  args: {
    post: {
      id: 3,
      userId: 3,
      title: 'Quick Tip',
      body: 'Short and sweet advice.'
    },
    isLoading: false,
    error: null,
  },
}