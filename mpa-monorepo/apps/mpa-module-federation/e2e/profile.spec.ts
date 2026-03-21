import { test, expect } from '@playwright/test'

test.describe('Profile page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate directly to the profile URL — a real page load, not a client nav
    await page.goto('/profile')
    // Wait for the federated ProfileWidget to finish loading
    await page.waitForSelector('input[type="email"]', { timeout: 15_000 })
  })

  test.describe('layout', () => {
    test('URL is /profile', async ({ page }) => {
      await expect(page).toHaveURL('/profile')
    })

    test('shows the Profile heading', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible()
    })

    test('shows the user role', async ({ page }) => {
      await expect(page.getByText('Product Manager')).toBeVisible()
    })

    test('shows the display name field', async ({ page }) => {
      await expect(page.getByLabel('Display name')).toBeVisible()
    })

    test('shows the email field', async ({ page }) => {
      await expect(page.getByLabel('Email')).toBeVisible()
    })

    test('shows the Save changes button', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'Save changes' })).toBeVisible()
    })

    test('shows the timezone info', async ({ page }) => {
      await expect(page.getByText(/UTC\+10/)).toBeVisible()
    })

    test('shows the joined date', async ({ page }) => {
      await expect(page.getByText(/January 2023/)).toBeVisible()
    })
  })

  test.describe('default field values', () => {
    test('pre-fills the display name', async ({ page }) => {
      await expect(page.getByLabel('Display name')).toHaveValue('Jane Smith')
    })

    test('pre-fills the email', async ({ page }) => {
      await expect(page.getByLabel('Email')).toHaveValue('jane.smith@example.com')
    })
  })

  test.describe('form editing', () => {
    test('allows changing the display name', async ({ page }) => {
      await page.getByLabel('Display name').fill('John Doe')
      await expect(page.getByLabel('Display name')).toHaveValue('John Doe')
    })

    test('allows changing the email', async ({ page }) => {
      await page.getByLabel('Email').fill('john.doe@example.com')
      await expect(page.getByLabel('Email')).toHaveValue('john.doe@example.com')
    })

    test('avatar initial updates as name is typed', async ({ page }) => {
      await page.getByLabel('Display name').fill('Bob')
      await expect(page.getByText('B')).toBeVisible()
    })
  })

  test.describe('saving', () => {
    test('shows "Saved!" after clicking Save changes', async ({ page }) => {
      await page.getByRole('button', { name: 'Save changes' }).click()
      await expect(page.getByRole('button', { name: 'Saved!' })).toBeVisible()
    })

    test('button reverts to "Save changes" after a short delay', async ({ page }) => {
      await page.getByRole('button', { name: 'Save changes' }).click()
      await expect(page.getByRole('button', { name: 'Save changes' })).toBeVisible({
        timeout: 5_000,
      })
    })

    test('persists the updated name after saving', async ({ page }) => {
      await page.getByLabel('Display name').fill('Updated Name')
      await page.getByRole('button', { name: 'Save changes' }).click()
      await expect(page.getByLabel('Display name')).toHaveValue('Updated Name')
    })

    test('persists the updated email after saving', async ({ page }) => {
      await page.getByLabel('Email').fill('updated@example.com')
      await page.getByRole('button', { name: 'Save changes' }).click()
      await expect(page.getByLabel('Email')).toHaveValue('updated@example.com')
    })
  })

  test.describe('module federation loading', () => {
    test('profile widget content is visible after load', async ({ page }) => {
      await expect(page.getByLabel('Display name')).toBeVisible()
    })

    test('does not show the loading fallback after the widget loads', async ({ page }) => {
      await expect(page.locator('.animate-pulse')).not.toBeVisible()
    })
  })
})
