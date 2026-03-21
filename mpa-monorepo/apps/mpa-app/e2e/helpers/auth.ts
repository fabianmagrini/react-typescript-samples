import type { BrowserContext, Page } from '@playwright/test'

export const SESSION_COOKIE = 'mpa_session'

export async function authenticate(context: BrowserContext) {
  await context.addCookies([
    {
      name: SESSION_COOKIE,
      value: 'authenticated',
      domain: 'localhost',
      path: '/',
      httpOnly: true,
    },
  ])
}

export async function loginViaUI(page: Page) {
  await page.goto('/login')
  await page.getByLabel('Username').fill('testuser')
  await page.getByLabel('Password').fill('testpass')
  await page.getByRole('button', { name: 'Sign in' }).click()
  await page.waitForURL('/dashboard')
}
