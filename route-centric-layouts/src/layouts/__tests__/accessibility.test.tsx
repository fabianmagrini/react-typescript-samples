import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MainLayout } from '../MainLayout'
import { DashboardLayout } from '../DashboardLayout'

describe('Layout Accessibility', () => {
  describe('MainLayout', () => {
    it('has proper semantic structure', () => {
      const { container } = render(
        <MainLayout>
          <div>Content</div>
        </MainLayout>
      )

      // Should have header, main, and footer landmarks
      expect(container.querySelector('header')).toBeInTheDocument()
      expect(container.querySelector('main')).toBeInTheDocument()
      expect(container.querySelector('footer')).toBeInTheDocument()
    })

    it('has accessible navigation', () => {
      const { container } = render(
        <MainLayout>
          <div>Content</div>
        </MainLayout>
      )

      const nav = container.querySelector('nav')
      expect(nav).toBeInTheDocument()
      
      // Navigation links should be accessible
      const links = nav?.querySelectorAll('a')
      links?.forEach(link => {
        expect(link).toHaveAttribute('href')
        expect(link.textContent?.trim()).toBeTruthy()
      })
    })

    it('has proper heading hierarchy', () => {
      const { container } = render(
        <MainLayout>
          <div>Content</div>
        </MainLayout>
      )

      // Should have main h1 in header
      const h1 = container.querySelector('h1')
      expect(h1).toBeInTheDocument()
      expect(h1).toHaveTextContent('Route-Centric Layouts')
    })
  })

  describe('DashboardLayout', () => {
    it('has proper semantic structure', () => {
      const { container } = render(
        <DashboardLayout>
          <div>Content</div>
        </DashboardLayout>
      )

      // Should have aside (sidebar), header, and main
      expect(container.querySelector('aside')).toBeInTheDocument()
      expect(container.querySelector('header')).toBeInTheDocument()
      expect(container.querySelector('main')).toBeInTheDocument()
    })

    it('has accessible sidebar navigation', () => {
      const { container } = render(
        <DashboardLayout>
          <div>Content</div>
        </DashboardLayout>
      )

      const nav = container.querySelector('nav')
      expect(nav).toBeInTheDocument()
      
      // All navigation links should be accessible
      const links = nav?.querySelectorAll('a')
      expect(links?.length).toBeGreaterThan(0)
      
      links?.forEach(link => {
        expect(link).toHaveAttribute('href')
        expect(link.textContent?.trim()).toBeTruthy()
      })
    })

    it('has accessible notification button', () => {
      const { container } = render(
        <DashboardLayout>
          <div>Content</div>
        </DashboardLayout>
      )

      const button = container.querySelector('button')
      expect(button).toBeInTheDocument()
      
      // Should have screen reader text
      const srOnly = button?.querySelector('.sr-only')
      expect(srOnly).toBeInTheDocument()
      expect(srOnly).toHaveTextContent('View notifications')
    })

    it('has proper heading hierarchy', () => {
      const { container } = render(
        <DashboardLayout>
          <div>Content</div>
        </DashboardLayout>
      )

      // Should have h1 in header and h2 in sidebar
      const headings = container.querySelectorAll('h1, h2')
      expect(headings.length).toBeGreaterThanOrEqual(2)
      
      const h1 = container.querySelector('h1')
      const h2 = container.querySelector('h2')
      
      expect(h1).toHaveTextContent('Dashboard')
      expect(h2).toHaveTextContent('Menu')
    })

    it('has sufficient color contrast for text elements', () => {
      const { container } = render(
        <DashboardLayout>
          <div>Content</div>
        </DashboardLayout>
      )

      // Check for appropriate text color classes
      const textElements = container.querySelectorAll('.text-gray-900, .text-gray-700, .text-gray-600')
      expect(textElements.length).toBeGreaterThan(0)
      
      // Ensure no low-contrast text colors are used
      const lowContrastElements = container.querySelectorAll('.text-gray-400, .text-gray-300')
      lowContrastElements.forEach(element => {
        // Low contrast text should only be used for secondary information
        expect(element.classList.contains('text-xs') || element.textContent?.includes('ago')).toBeTruthy()
      })
    })
  })

  describe('Layout Focus Management', () => {
    it('allows keyboard navigation in MainLayout', () => {
      const { container } = render(
        <MainLayout>
          <div>Content</div>
        </MainLayout>
      )

      const focusableElements = container.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')
      expect(focusableElements.length).toBeGreaterThan(0)
      
      // All focusable elements should be keyboard accessible
      focusableElements.forEach(element => {
        expect(element).not.toHaveAttribute('tabindex', '-1')
      })
    })

    it('allows keyboard navigation in DashboardLayout', () => {
      const { container } = render(
        <DashboardLayout>
          <div>Content</div>
        </DashboardLayout>
      )

      const focusableElements = container.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')
      expect(focusableElements.length).toBeGreaterThan(0)
      
      // All focusable elements should be keyboard accessible
      focusableElements.forEach(element => {
        expect(element).not.toHaveAttribute('tabindex', '-1')
      })
    })
  })
})