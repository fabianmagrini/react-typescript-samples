import { expect, test } from '@playwright/test';

test.describe('Shell — routing and navigation', () => {
  // ---------------------------------------------------------------------------
  // Routing
  // ---------------------------------------------------------------------------

  test('redirects / to /dashboard', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('renders the Dashboard page at /dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('renders the Profile page at /profile', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible();
  });

  test('has the correct page title', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveTitle('MFE Demo');
  });

  // ---------------------------------------------------------------------------
  // Navigation bar — presence and content
  // ---------------------------------------------------------------------------

  test('renders the brand name', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByText('MFE Demo')).toBeVisible();
  });

  test('renders Dashboard and Profile nav links', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Profile' })).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Active link state
  // ---------------------------------------------------------------------------

  test('Dashboard link is active at /dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByRole('link', { name: 'Dashboard' })).toHaveClass(/active/);
    await expect(page.getByRole('link', { name: 'Profile' })).not.toHaveClass(/active/);
  });

  test('Profile link is active at /profile', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.getByRole('link', { name: 'Profile' })).toHaveClass(/active/);
    await expect(page.getByRole('link', { name: 'Dashboard' })).not.toHaveClass(/active/);
  });

  test('active link updates when clicking between routes', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByRole('link', { name: 'Dashboard' })).toHaveClass(/active/);

    await page.getByRole('link', { name: 'Profile' }).click();
    await expect(page).toHaveURL(/\/profile/);
    await expect(page.getByRole('link', { name: 'Profile' })).toHaveClass(/active/);
    await expect(page.getByRole('link', { name: 'Dashboard' })).not.toHaveClass(/active/);
  });

  // ---------------------------------------------------------------------------
  // No-flicker guarantee
  // ---------------------------------------------------------------------------

  test('navigation is visible before route content finishes loading', async ({ page }) => {
    // The nav is rendered by the shell synchronously with the first React paint.
    // It must appear before (or at the same time as) the MFE content, never after.
    // We navigate without waiting for networkidle to catch it early.
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });

    // Brand must appear within the bootstrap window — no full network idle needed
    await expect(page.getByText('MFE Demo')).toBeVisible({ timeout: 3000 });
  });

  test('navigation persists and does not disappear during route transitions', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByText('MFE Demo')).toBeVisible();

    // Click through to profile
    await page.getByRole('link', { name: 'Profile' }).click();
    // Nav must still be present immediately — no re-mount, no flash
    await expect(page.getByText('MFE Demo')).toBeVisible();

    // Navigate back
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page.getByText('MFE Demo')).toBeVisible();
  });

  test('navigation does not cause layout shift (CLS < 0.1)', async ({ page }) => {
    // Inject a PerformanceObserver before the page loads so it captures
    // every layout-shift entry from the very first paint.
    await page.addInitScript(() => {
      (window as any).__cls = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            (window as any).__cls += (entry as any).value;
          }
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });

    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    // Small pause to capture any deferred layout shifts
    await page.waitForTimeout(300);

    const cls = await page.evaluate(() => (window as any).__cls as number);
    expect(cls).toBeLessThan(0.1);
  });
});
