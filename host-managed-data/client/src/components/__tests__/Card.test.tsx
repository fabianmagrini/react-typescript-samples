import { render, screen } from '@testing-library/react'
import { Card } from '../Card'

test('renders card with children', () => {
  render(
    <Card>
      <h1>Test Content</h1>
      <p>This is test content</p>
    </Card>
  )
  
  expect(screen.getByText('Test Content')).toBeInTheDocument()
  expect(screen.getByText('This is test content')).toBeInTheDocument()
})

test('applies custom className', () => {
  const { container } = render(
    <Card className="custom-class">
      <div>Content</div>
    </Card>
  )
  
  const cardElement = container.firstChild as HTMLElement
  expect(cardElement).toHaveClass('custom-class')
  expect(cardElement).toHaveClass('bg-white')
  expect(cardElement).toHaveClass('dark:bg-gray-800')
})