import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { createMemoryHistory } from '@tanstack/react-router'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from '../../routeTree.gen'

// Create router for testing
const createTestRouter = (initialEntries: string[] = ['/']) => {
  const history = createMemoryHistory({
    initialEntries,
  })
  
  return createRouter({
    routeTree,
    history,
  })
}

describe('Route-Centric Layout Integration', () => {
  it('renders MainLayout for home route', async () => {
    const router = createTestRouter(['/'])
    
    render(<RouterProvider router={router} />)
    
    // Wait for router to load
    await router.load()
    
    // Should render MainLayout elements
    expect(screen.getByText('Route-Centric Layouts')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    
    // Should render home page content
    expect(screen.getByText('Welcome to Route-Centric Layouts')).toBeInTheDocument()
    expect(screen.getByText(/This demo showcases route-centric layout patterns/)).toBeInTheDocument()
  })

  it('renders MainLayout for about route', async () => {
    const router = createTestRouter(['/about'])
    
    render(<RouterProvider router={router} />)
    
    await router.load()
    
    // Should render MainLayout elements
    expect(screen.getByText('Route-Centric Layouts')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    
    // Should render about page content
    expect(screen.getByText('About This Project')).toBeInTheDocument()
    expect(screen.getByText(/This application demonstrates a React setup/)).toBeInTheDocument()
  })

  it('renders DashboardLayout for dashboard route', async () => {
    const router = createTestRouter(['/dashboard'])
    
    render(<RouterProvider router={router} />)
    
    await router.load()
    
    // Should render DashboardLayout elements
    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    
    // Should render dashboard page content
    expect(screen.getByText('Dashboard Overview')).toBeInTheDocument()
    expect(screen.getByText(/Welcome to your dashboard/)).toBeInTheDocument()
    
    // Should NOT render MainLayout navigation
    expect(screen.queryByText('Home')).not.toBeInTheDocument()
    expect(screen.queryByText('About')).not.toBeInTheDocument()
  })

  it('demonstrates different layouts for different route groups', async () => {
    // Test MainLayout routes
    const mainRouter = createTestRouter(['/'])
    const { unmount: unmountMain } = render(<RouterProvider router={mainRouter} />)
    await mainRouter.load()
    
    expect(screen.getByText('Route-Centric Layouts')).toBeInTheDocument()
    expect(screen.getByText(/© 2025 Route-Centric Layouts Demo/)).toBeInTheDocument()
    
    unmountMain()
    
    // Test DashboardLayout routes  
    const dashRouter = createTestRouter(['/dashboard'])
    render(<RouterProvider router={dashRouter} />)
    await dashRouter.load()
    
    expect(screen.getByText('🔔')).toBeInTheDocument()
    
    // Verify different layout structure
    expect(screen.queryByText(/© 2025 Route-Centric Layouts Demo/)).not.toBeInTheDocument()
  })

  it('maintains layout-specific structure and styling', async () => {
    const router = createTestRouter(['/dashboard'])
    const { container } = render(<RouterProvider router={router} />)
    
    await router.load()
    
    // Check for dashboard-specific layout classes
    const dashboardContainer = container.querySelector('.min-h-screen.bg-gray-100')
    const sidebar = container.querySelector('.w-64.bg-white.shadow-sm')
    const flexContainer = container.querySelector('.flex')
    
    expect(dashboardContainer).toBeInTheDocument()
    expect(sidebar).toBeInTheDocument()
    expect(flexContainer).toBeInTheDocument()
  })
})