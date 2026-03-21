import { expect, test } from '@playwright/test';

test.describe('Dashboard page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
    // Wait for the lazy-loaded MFE content to appear before each test
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Header
  // ---------------------------------------------------------------------------

  test('renders the page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('renders the subtitle', async ({ page }) => {
    await expect(page.getByText(/welcome back/i)).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Stat cards
  // ---------------------------------------------------------------------------

  test('renders all three stat card labels', async ({ page }) => {
    await expect(page.getByText('Total Users')).toBeVisible();
    await expect(page.getByText('Revenue')).toBeVisible();
    await expect(page.getByText('Active Sessions')).toBeVisible();
  });

  test('renders correct stat values', async ({ page }) => {
    await expect(page.getByText('12,483')).toBeVisible();
    await expect(page.getByText('$48,295')).toBeVisible();
    await expect(page.getByText('1,024')).toBeVisible();
  });

  test('renders positive trend indicators', async ({ page }) => {
    await expect(page.getByText('+12% vs last month')).toBeVisible();
    await expect(page.getByText('+8.1% vs last month')).toBeVisible();
  });

  test('renders negative trend indicators', async ({ page }) => {
    await expect(page.getByText('-3% vs last month')).toBeVisible();
  });

  test('positive trends are styled in green', async ({ page }) => {
    const positive = page.getByText('+12% vs last month');
    await expect(positive).toHaveClass(/text-emerald-600/);
  });

  test('negative trends are styled in red', async ({ page }) => {
    const negative = page.getByText('-3% vs last month');
    await expect(negative).toHaveClass(/text-red-500/);
  });

  // ---------------------------------------------------------------------------
  // Recent Activity
  // ---------------------------------------------------------------------------

  test('renders the Recent Activity section heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Recent Activity' })).toBeVisible();
  });

  test('renders all four activity entries', async ({ page }) => {
    await expect(page.getByText('Alice Johnson')).toBeVisible();
    await expect(page.getByText('Bob Smith')).toBeVisible();
    await expect(page.getByText('Carol White')).toBeVisible();
    await expect(page.getByText('David Brown')).toBeVisible();
  });

  test('renders actions for each entry', async ({ page }) => {
    await expect(page.getByText('Signed up')).toBeVisible();
    await expect(page.getByText('Upgraded plan')).toBeVisible();
    await expect(page.getByText('Submitted report')).toBeVisible();
    await expect(page.getByText('Invited team member')).toBeVisible();
  });

  test('renders relative timestamps', async ({ page }) => {
    await expect(page.getByText('2 min ago')).toBeVisible();
    await expect(page.getByText('14 min ago')).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Remote identifier (confirms content is served by mfe-dashboard)
  // ---------------------------------------------------------------------------

  test('shows the mfe-dashboard remote identifier', async ({ page }) => {
    await expect(page.getByText(/mfe-dashboard/)).toBeVisible();
  });

  test('remote identifier mentions port 3001', async ({ page }) => {
    await expect(page.getByText(/3001/)).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Navigation still present (cross-cutting concern)
  // ---------------------------------------------------------------------------

  test('navigation bar is present on the dashboard page', async ({ page }) => {
    await expect(page.getByText('MFE Demo')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
  });
});
