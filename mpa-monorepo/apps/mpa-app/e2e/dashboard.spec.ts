import { test, expect } from '@playwright/test'
import { authenticate } from './helpers/auth'

test.describe('Dashboard', () => {
  test.beforeEach(async ({ context, page }) => {
    await authenticate(context)
    await page.goto('/dashboard')
  })

  test.describe('layout', () => {
    test('shows Dashboard heading', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
    })

    test('shows the sidebar navigation', async ({ page }) => {
      await expect(page.getByRole('navigation')).toBeVisible()
    })

    test('highlights Dashboard as active nav item', async ({ page }) => {
      const dashboardLink = page.getByRole('link', { name: 'Dashboard' })
      await expect(dashboardLink).toHaveClass(/text-blue-700/)
    })

    test('shows all range buttons', async ({ page }) => {
      await expect(page.getByRole('button', { name: '7d' })).toBeVisible()
      await expect(page.getByRole('button', { name: '30d' })).toBeVisible()
      await expect(page.getByRole('button', { name: '90d' })).toBeVisible()
    })

    test('shows Recent Activity section', async ({ page }) => {
      await expect(page.getByText('Recent Activity')).toBeVisible()
    })

    test('shows user email in sidebar', async ({ page }) => {
      await expect(page.getByText('jane@example.com')).toBeVisible()
    })
  })

  test.describe('metrics — default 7d', () => {
    test('shows 7d active users', async ({ page }) => {
      await expect(page.getByText('1,284')).toBeVisible()
    })

    test('shows 7d revenue', async ({ page }) => {
      await expect(page.getByText('$8,430')).toBeVisible()
    })

    test('shows all metric labels', async ({ page }) => {
      await expect(page.getByText('Active Users')).toBeVisible()
      await expect(page.getByText('Revenue')).toBeVisible()
      await expect(page.getByText('Tickets Opened')).toBeVisible()
      await expect(page.getByText('Avg. Response Time')).toBeVisible()
    })
  })

  test.describe('range selector', () => {
    test('switches to 30d metrics', async ({ page }) => {
      await page.getByRole('button', { name: '30d' }).click()
      await expect(page.getByText('5,102')).toBeVisible()
      await expect(page.getByText('$34,820')).toBeVisible()
    })

    test('switches to 90d metrics', async ({ page }) => {
      await page.getByRole('button', { name: '90d' }).click()
      await expect(page.getByText('14,900')).toBeVisible()
      await expect(page.getByText('$102,310')).toBeVisible()
    })

    test('switches back from 30d to 7d', async ({ page }) => {
      await page.getByRole('button', { name: '30d' }).click()
      await page.getByRole('button', { name: '7d' }).click()
      await expect(page.getByText('1,284')).toBeVisible()
    })

    test('removes previous range data when switching', async ({ page }) => {
      await page.getByRole('button', { name: '30d' }).click()
      await expect(page.getByText('1,284')).not.toBeVisible()
    })
  })

  test.describe('activity feed', () => {
    test('shows all activity entries', async ({ page }) => {
      await expect(page.getByText('Alice Chen')).toBeVisible()
      await expect(page.getByText('Bob Martinez')).toBeVisible()
      await expect(page.getByText('Carol Lee')).toBeVisible()
      await expect(page.getByText('David Kim')).toBeVisible()
      await expect(page.getByText('Eve Patel')).toBeVisible()
    })

    test('shows activity timestamps', async ({ page }) => {
      await expect(page.getByText('2m ago')).toBeVisible()
      await expect(page.getByText('14m ago')).toBeVisible()
    })
  })

  test.describe('navigation', () => {
    test('navigates to Profile via sidebar', async ({ page }) => {
      await page.getByRole('link', { name: 'Profile' }).click()
      await expect(page).toHaveURL('/profile')
    })
  })
})
