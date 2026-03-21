import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.describe('root redirect', () => {
    test('/ redirects to /dashboard', async ({ page }) => {
      await page.goto('/')
      await expect(page).toHaveURL('/dashboard')
    })
  })

  test.describe('dashboard page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/dashboard')
    })

    test('URL is /dashboard', async ({ page }) => {
      await expect(page).toHaveURL('/dashboard')
    })

    test('shows the app title in the sidebar', async ({ page }) => {
      await expect(page.getByText('MPA · Module Federation')).toBeVisible()
    })

    test('shows a Dashboard link', async ({ page }) => {
      await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible()
    })

    test('shows a Profile link', async ({ page }) => {
      await expect(page.getByRole('link', { name: 'Profile' })).toBeVisible()
    })

    test('Dashboard link points to /dashboard', async ({ page }) => {
      await expect(page.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/dashboard')
    })

    test('Profile link points to /profile', async ({ page }) => {
      await expect(page.getByRole('link', { name: 'Profile' })).toHaveAttribute('href', '/profile')
    })

    test('shows the host port hint', async ({ page }) => {
      await expect(page.getByText(':4000')).toBeVisible()
    })

    test('shows the remote port hint', async ({ page }) => {
      await expect(page.getByText(':4001')).toBeVisible()
    })

    test('highlights the Dashboard link as active', async ({ page }) => {
      await expect(page.getByRole('link', { name: 'Dashboard' })).toHaveClass(/bg-blue-50/)
    })

    test('does not highlight the Profile link', async ({ page }) => {
      await expect(page.getByRole('link', { name: 'Profile' })).not.toHaveClass(/bg-blue-50/)
    })
  })

  test.describe('navigating to the profile page', () => {
    test('clicking Profile loads a new document at /profile', async ({ page }) => {
      await page.goto('/dashboard')
      await page.getByRole('link', { name: 'Profile' }).click()
      // A real page navigation — the URL must change
      await expect(page).toHaveURL('/profile')
    })

    test('the profile page shows the Profile heading', async ({ page }) => {
      await page.goto('/dashboard')
      await page.getByRole('link', { name: 'Profile' }).click()
      await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible()
    })

    test('the profile page highlights the Profile link', async ({ page }) => {
      await page.goto('/profile')
      await expect(page.getByRole('link', { name: 'Profile' })).toHaveClass(/bg-blue-50/)
    })

    test('the profile page does not highlight the Dashboard link', async ({ page }) => {
      await page.goto('/profile')
      await expect(page.getByRole('link', { name: 'Dashboard' })).not.toHaveClass(/bg-blue-50/)
    })
  })

  test.describe('navigating back to the dashboard page', () => {
    test('clicking Dashboard from Profile loads a new document at /dashboard', async ({ page }) => {
      await page.goto('/profile')
      await page.getByRole('link', { name: 'Dashboard' }).click()
      await expect(page).toHaveURL('/dashboard')
    })

    test('the dashboard page shows the Dashboard heading after navigating back', async ({ page }) => {
      await page.goto('/profile')
      await page.getByRole('link', { name: 'Dashboard' }).click()
      await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
    })

    test('reloading /profile stays on /profile', async ({ page }) => {
      await page.goto('/profile')
      await page.reload()
      await expect(page).toHaveURL('/profile')
      await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible()
    })

    test('reloading /dashboard stays on /dashboard', async ({ page }) => {
      await page.goto('/dashboard')
      await page.reload()
      await expect(page).toHaveURL('/dashboard')
      await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
    })
  })

  test.describe('browser history', () => {
    test('back button returns to /dashboard from /profile', async ({ page }) => {
      await page.goto('/dashboard')
      await page.goto('/profile')
      await page.goBack()
      await expect(page).toHaveURL('/dashboard')
    })

    test('forward button returns to /profile after going back', async ({ page }) => {
      await page.goto('/dashboard')
      await page.goto('/profile')
      await page.goBack()
      await page.goForward()
      await expect(page).toHaveURL('/profile')
    })
  })
})
