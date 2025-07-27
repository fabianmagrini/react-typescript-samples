import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Card, CardHeader, CardContent, CardFooter } from './Card'

describe('Card Components', () => {
  describe('Card', () => {
    it('renders correctly', () => {
      render(
        <Card>
          <div>Card content</div>
        </Card>
      )
      expect(screen.getByText('Card content')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(
        <Card className="custom-card">
          <div>Content</div>
        </Card>
      )
      const card = screen.getByText('Content').parentElement
      expect(card).toHaveClass('custom-card')
    })
  })

  describe('CardHeader', () => {
    it('renders correctly', () => {
      render(
        <Card>
          <CardHeader>
            <h3>Header Title</h3>
          </CardHeader>
        </Card>
      )
      expect(screen.getByText('Header Title')).toBeInTheDocument()
    })

    it('applies correct default classes', () => {
      render(
        <Card>
          <CardHeader>
            <h3>Header</h3>
          </CardHeader>
        </Card>
      )
      const header = screen.getByText('Header').parentElement
      expect(header).toHaveClass('px-6', 'py-4', 'border-b')
    })
  })

  describe('CardContent', () => {
    it('renders correctly', () => {
      render(
        <Card>
          <CardContent>
            <p>Card content text</p>
          </CardContent>
        </Card>
      )
      expect(screen.getByText('Card content text')).toBeInTheDocument()
    })

    it('applies correct default classes', () => {
      render(
        <Card>
          <CardContent>
            <p>Content</p>
          </CardContent>
        </Card>
      )
      const content = screen.getByText('Content').parentElement
      expect(content).toHaveClass('px-6', 'py-4')
    })
  })

  describe('CardFooter', () => {
    it('renders correctly', () => {
      render(
        <Card>
          <CardFooter>
            <button>Footer Action</button>
          </CardFooter>
        </Card>
      )
      expect(screen.getByText('Footer Action')).toBeInTheDocument()
    })

    it('applies correct default classes', () => {
      render(
        <Card>
          <CardFooter>
            <button>Action</button>
          </CardFooter>
        </Card>
      )
      const footer = screen.getByText('Action').parentElement
      expect(footer).toHaveClass('px-6', 'py-4', 'border-t', 'bg-gray-50')
    })
  })

  describe('Complete Card', () => {
    it('renders a complete card with all sections', () => {
      render(
        <Card>
          <CardHeader>
            <h3>Complete Card</h3>
          </CardHeader>
          <CardContent>
            <p>This is the content</p>
          </CardContent>
          <CardFooter>
            <button>Action Button</button>
          </CardFooter>
        </Card>
      )

      expect(screen.getByText('Complete Card')).toBeInTheDocument()
      expect(screen.getByText('This is the content')).toBeInTheDocument()
      expect(screen.getByText('Action Button')).toBeInTheDocument()
    })
  })
})