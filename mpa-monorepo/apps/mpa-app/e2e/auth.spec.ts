import { test, expect } from '@playwright/test'
import { authenticate, loginViaUI, SESSION_COOKIE } from './helpers/auth'

test.describe('Authentication', () => {
  test.describe('unauthenticated access', () => {
    test('redirects / to /login when not authenticated', async ({ page }) => {
      await page.goto('/')
      await expect(page).toHaveURL('/login')
    })

    test('redirects /dashboard to /login when not authenticated', async ({ page }) => {
      await page.goto('/dashboard')
      await expect(page).toHaveURL('/login')
    })

    test('redirects /profile to /login when not authenticated', async ({ page }) => {
      await page.goto('/profile')
      await expect(page).toHaveURL('/login')
    })

    test('allows direct access to /login', async ({ page }) => {
      await page.goto('/login')
      await expect(page).toHaveURL('/login')
    })
  })

  test.describe('login page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/login')
    })

    test('shows Sign in heading', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible()
    })

    test('shows username field', async ({ page }) => {
      await expect(page.getByLabel('Username')).toBeVisible()
    })

    test('shows password field', async ({ page }) => {
      await expect(page.getByLabel('Password')).toBeVisible()
    })

    test('shows submit button', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible()
    })

    test('shows stub auth hint', async ({ page }) => {
      await expect(page.getByText('Stub auth — any credentials work')).toBeVisible()
    })
  })

  test.describe('login flow', () => {
    test('redirects to /dashboard after successful login', async ({ page }) => {
      await loginViaUI(page)
      await expect(page).toHaveURL('/dashboard')
    })

    test('sets session cookie after login', async ({ page, context }) => {
      await loginViaUI(page)
      const cookies = await context.cookies()
      const session = cookies.find((c) => c.name === SESSION_COOKIE)
      expect(session).toBeDefined()
      expect(session?.value).toBe('authenticated')
    })

    test('accepts any non-empty credentials', async ({ page }) => {
      await page.goto('/login')
      await page.getByLabel('Username').fill('anyone')
      await page.getByLabel('Password').fill('anything')
      await page.getByRole('button', { name: 'Sign in' }).click()
      await expect(page).toHaveURL('/dashboard')
    })

    test('redirects authenticated user away from /login to /dashboard', async ({ page, context }) => {
      await authenticate(context)
      await page.goto('/login')
      await expect(page).toHaveURL('/dashboard')
    })
  })

  test.describe('logout flow', () => {
    test.beforeEach(async ({ context }) => {
      await authenticate(context)
    })

    test('redirects to /login after logout', async ({ page }) => {
      await page.goto('/dashboard')
      await page.getByRole('link', { name: 'Sign out' }).click()
      await expect(page).toHaveURL('/login')
    })

    test('clears session cookie on logout', async ({ page, context }) => {
      await page.goto('/dashboard')
      await page.getByRole('link', { name: 'Sign out' }).click()
      const cookies = await context.cookies()
      const session = cookies.find((c) => c.name === SESSION_COOKIE)
      expect(session).toBeUndefined()
    })

    test('cannot access protected routes after logout', async ({ page }) => {
      await page.goto('/dashboard')
      await page.getByRole('link', { name: 'Sign out' }).click()
      await page.goto('/dashboard')
      await expect(page).toHaveURL('/login')
    })
  })
})
