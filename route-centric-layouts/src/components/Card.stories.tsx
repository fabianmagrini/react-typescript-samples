import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardContent, CardFooter } from './Card'
import { Button } from './Button'

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
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <h3 className="text-lg font-semibold">Card Title</h3>
        <p className="text-sm text-gray-600">Card subtitle</p>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">
          This is the main content of the card. You can put any content here,
          including text, images, forms, or other components.
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex space-x-2">
          <Button variant="primary">Primary Action</Button>
          <Button variant="outline">Secondary Action</Button>
        </div>
      </CardFooter>
    </Card>
  ),
}

export const Simple: Story = {
  render: () => (
    <Card className="w-96">
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">Simple Card</h3>
        <p className="text-gray-700">
          A simple card with just content, no header or footer.
        </p>
      </CardContent>
    </Card>
  ),
}

export const HeaderOnly: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <h3 className="text-lg font-semibold">Header Only Card</h3>
        <p className="text-sm text-gray-600">This card only has a header</p>
      </CardHeader>
    </Card>
  ),
}