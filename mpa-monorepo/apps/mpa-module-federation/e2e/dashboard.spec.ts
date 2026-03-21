import { test, expect } from '@playwright/test'

test.describe('Dashboard page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard')
    // Wait for the federated DashboardWidget to finish loading
    await page.waitForSelector('text=Recent Activity', { timeout: 15_000 })
  })

  test.describe('layout', () => {
    test('URL is /dashboard', async ({ page }) => {
      await expect(page).toHaveURL('/dashboard')
    })

    test('shows the Dashboard heading', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
    })

    test('shows all range selector buttons', async ({ page }) => {
      await expect(page.getByRole('button', { name: '7d' })).toBeVisible()
      await expect(page.getByRole('button', { name: '30d' })).toBeVisible()
      await expect(page.getByRole('button', { name: '90d' })).toBeVisible()
    })

    test('shows the Recent Activity section', async ({ page }) => {
      await expect(page.getByText('Recent Activity')).toBeVisible()
    })

    test('shows all metric labels', async ({ page }) => {
      await expect(page.getByText('Active Users')).toBeVisible()
      await expect(page.getByText('Revenue')).toBeVisible()
      await expect(page.getByText('Tickets Opened')).toBeVisible()
      await expect(page.getByText('Avg. Response Time')).toBeVisible()
    })
  })

  test.describe('default 7d metrics', () => {
    test('shows 7d active users value', async ({ page }) => {
      await expect(page.getByText('1,284')).toBeVisible()
    })

    test('shows 7d revenue value', async ({ page }) => {
      await expect(page.getByText('$8,430')).toBeVisible()
    })

    test('shows 7d tickets value', async ({ page }) => {
      await expect(page.getByText('38')).toBeVisible()
    })

    test('shows 7d response time value', async ({ page }) => {
      await expect(page.getByText('2.4h')).toBeVisible()
    })
  })

  test.describe('range selector', () => {
    test('switches to 30d active users', async ({ page }) => {
      await page.getByRole('button', { name: '30d' }).click()
      await expect(page.getByText('5,102')).toBeVisible()
    })

    test('switches to 30d revenue', async ({ page }) => {
      await page.getByRole('button', { name: '30d' }).click()
      await expect(page.getByText('$34,820')).toBeVisible()
    })

    test('switches to 90d active users', async ({ page }) => {
      await page.getByRole('button', { name: '90d' }).click()
      await expect(page.getByText('14,900')).toBeVisible()
    })

    test('switches to 90d revenue', async ({ page }) => {
      await page.getByRole('button', { name: '90d' }).click()
      await expect(page.getByText('$102,310')).toBeVisible()
    })

    test('removes 7d values when switching to 30d', async ({ page }) => {
      await page.getByRole('button', { name: '30d' }).click()
      await expect(page.getByText('1,284')).not.toBeVisible()
    })

    test('switches back from 30d to 7d', async ({ page }) => {
      await page.getByRole('button', { name: '30d' }).click()
      await page.getByRole('button', { name: '7d' }).click()
      await expect(page.getByText('1,284')).toBeVisible()
    })

    test('highlights the 30d button after clicking it', async ({ page }) => {
      await page.getByRole('button', { name: '30d' }).click()
      await expect(page.getByRole('button', { name: '30d' })).toHaveClass(/bg-white/)
    })

    test('removes the 7d highlight after switching to 30d', async ({ page }) => {
      await page.getByRole('button', { name: '30d' }).click()
      await expect(page.getByRole('button', { name: '7d' })).not.toHaveClass(/bg-white/)
    })
  })

  test.describe('activity feed', () => {
    test('shows Alice Chen entry', async ({ page }) => {
      await expect(page.getByText('Alice Chen')).toBeVisible()
    })

    test('shows Bob Martinez entry', async ({ page }) => {
      await expect(page.getByText('Bob Martinez')).toBeVisible()
    })

    test('shows Carol Lee entry', async ({ page }) => {
      await expect(page.getByText('Carol Lee')).toBeVisible()
    })

    test('shows David Kim entry', async ({ page }) => {
      await expect(page.getByText('David Kim')).toBeVisible()
    })

    test('shows Eve Patel entry', async ({ page }) => {
      await expect(page.getByText('Eve Patel')).toBeVisible()
    })

    test('shows timestamps', async ({ page }) => {
      await expect(page.getByText('2m ago')).toBeVisible()
      await expect(page.getByText('14m ago')).toBeVisible()
    })
  })

  test.describe('module federation loading', () => {
    test('widget content is visible without a loading spinner', async ({ page }) => {
      await expect(page.getByText('Active Users')).toBeVisible()
    })

    test('does not show the loading fallback after the widget loads', async ({ page }) => {
      await expect(page.locator('.animate-pulse')).not.toBeVisible()
    })
  })
})
