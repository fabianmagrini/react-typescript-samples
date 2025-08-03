import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is a basic card component',
  },
}

export const WithTitle: Story = {
  args: {
    children: `
      <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem;">Card Title</h3>
      <p style="color: #6b7280;">This card has a title and description content.</p>
    `,
  },
}

export const WithCustomClass: Story = {
  args: {
    children: 'Card with custom border styling',
    className: 'border-blue-200 dark:border-blue-700',
  },
}