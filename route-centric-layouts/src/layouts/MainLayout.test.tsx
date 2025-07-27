import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MainLayout } from './MainLayout'

describe('MainLayout', () => {
  it('renders correctly with children', () => {
    render(
      <MainLayout>
        <div>Test content</div>
      </MainLayout>
    )
    
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders the header with title', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    )
    
    expect(screen.getByText('Route-Centric Layouts')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    )
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('renders footer', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    )
    
    expect(screen.getByText(/© 2025 Route-Centric Layouts Demo/)).toBeInTheDocument()
  })

  it('has correct structure classes', () => {
    render(
      <MainLayout>
        <div data-testid="content">Content</div>
      </MainLayout>
    )
    
    const content = screen.getByTestId('content')
    const main = content.closest('main')
    expect(main).toHaveClass('max-w-7xl', 'mx-auto')
  })
})