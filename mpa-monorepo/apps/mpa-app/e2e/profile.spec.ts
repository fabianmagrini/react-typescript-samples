import { test, expect } from '@playwright/test'
import { authenticate } from './helpers/auth'

test.describe('Profile', () => {
  test.beforeEach(async ({ context, page }) => {
    await authenticate(context)
    await page.goto('/profile')
  })

  test.describe('layout', () => {
    test('shows Profile heading', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible()
    })

    test('shows Personal Information section', async ({ page }) => {
      await expect(page.getByText('Personal Information')).toBeVisible()
    })

    test('shows user name', async ({ page }) => {
      await expect(page.getByLabel('Full name')).toHaveValue('Jane Doe')
    })

    test('shows user email', async ({ page }) => {
      await expect(page.getByLabel('Email')).toHaveValue('jane@example.com')
    })

    test('shows user id', async ({ page }) => {
      await expect(page.getByLabel('User ID')).toHaveValue('user_1')
    })

    test('highlights Profile as active nav item', async ({ page }) => {
      const profileLink = page.getByRole('link', { name: 'Profile' })
      await expect(profileLink).toHaveClass(/text-blue-700/)
    })
  })

  test.describe('view mode', () => {
    test('fields are read-only initially', async ({ page }) => {
      await expect(page.getByLabel('Full name')).toBeDisabled()
      await expect(page.getByLabel('Email')).toBeDisabled()
    })

    test('shows Edit button', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'Edit' })).toBeVisible()
    })

    test('does not show Save/Cancel buttons', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'Save changes' })).not.toBeVisible()
      await expect(page.getByRole('button', { name: 'Cancel' })).not.toBeVisible()
    })
  })

  test.describe('edit mode', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'Edit' }).click()
    })

    test('enables name field after clicking Edit', async ({ page }) => {
      await expect(page.getByLabel('Full name')).toBeEnabled()
    })

    test('enables email field after clicking Edit', async ({ page }) => {
      await expect(page.getByLabel('Email')).toBeEnabled()
    })

    test('hides Edit button in edit mode', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'Edit' })).not.toBeVisible()
    })

    test('shows Save and Cancel buttons', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'Save changes' })).toBeVisible()
      await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible()
    })

    test('user id field stays disabled', async ({ page }) => {
      await expect(page.getByLabel('User ID')).toBeDisabled()
    })
  })

  test.describe('saving changes', () => {
    test('shows success message after saving', async ({ page }) => {
      await page.getByRole('button', { name: 'Edit' }).click()
      await page.getByRole('button', { name: 'Save changes' }).click()
      await expect(page.getByText('Changes saved (stub)')).toBeVisible()
    })

    test('returns to view mode after saving', async ({ page }) => {
      await page.getByRole('button', { name: 'Edit' }).click()
      await page.getByRole('button', { name: 'Save changes' }).click()
      await expect(page.getByRole('button', { name: 'Edit' })).toBeVisible()
      await expect(page.getByRole('button', { name: 'Save changes' })).not.toBeVisible()
    })

    test('persists updated name after saving', async ({ page }) => {
      await page.getByRole('button', { name: 'Edit' }).click()
      await page.getByLabel('Full name').fill('John Smith')
      await page.getByRole('button', { name: 'Save changes' }).click()
      await expect(page.getByLabel('Full name')).toHaveValue('John Smith')
    })

    test('persists updated email after saving', async ({ page }) => {
      await page.getByRole('button', { name: 'Edit' }).click()
      await page.getByLabel('Email').fill('john@example.com')
      await page.getByRole('button', { name: 'Save changes' }).click()
      await expect(page.getByLabel('Email')).toHaveValue('john@example.com')
    })

    test('re-entering edit mode clears the success message', async ({ page }) => {
      await page.getByRole('button', { name: 'Edit' }).click()
      await page.getByRole('button', { name: 'Save changes' }).click()
      await page.getByRole('button', { name: 'Edit' }).click()
      await expect(page.getByText('Changes saved (stub)')).not.toBeVisible()
    })

    test('fields are disabled after saving', async ({ page }) => {
      await page.getByRole('button', { name: 'Edit' }).click()
      await page.getByRole('button', { name: 'Save changes' }).click()
      await expect(page.getByLabel('Full name')).toBeDisabled()
    })
  })

  test.describe('cancelling', () => {
    test('returns to view mode on cancel', async ({ page }) => {
      await page.getByRole('button', { name: 'Edit' }).click()
      await page.getByRole('button', { name: 'Cancel' }).click()
      await expect(page.getByRole('button', { name: 'Edit' })).toBeVisible()
    })

    test('discards unsaved name changes on cancel', async ({ page }) => {
      await page.getByRole('button', { name: 'Edit' }).click()
      await page.getByLabel('Full name').fill('John Smith')
      await page.getByRole('button', { name: 'Cancel' }).click()
      await expect(page.getByLabel('Full name')).toHaveValue('Jane Doe')
    })

    test('discards unsaved email changes on cancel', async ({ page }) => {
      await page.getByRole('button', { name: 'Edit' }).click()
      await page.getByLabel('Email').fill('changed@example.com')
      await page.getByRole('button', { name: 'Cancel' }).click()
      await expect(page.getByLabel('Email')).toHaveValue('jane@example.com')
    })

    test('fields are disabled after cancelling', async ({ page }) => {
      await page.getByRole('button', { name: 'Edit' }).click()
      await page.getByRole('button', { name: 'Cancel' }).click()
      await expect(page.getByLabel('Full name')).toBeDisabled()
    })
  })

  test.describe('navigation', () => {
    test('navigates to Dashboard via sidebar', async ({ page }) => {
      await page.getByRole('link', { name: 'Dashboard' }).click()
      await expect(page).toHaveURL('/dashboard')
    })
  })
})
