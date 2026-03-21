import { expect, test } from '@playwright/test';

test.describe('Profile page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/profile');
    // Wait for the lazy-loaded MFE content before each test
    await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible();
  });

  // Helpers — locate inputs by their name attribute (Playwright has no getByDisplayValue)
  const nameInput  = (page: any) => page.locator('input[name="name"]');
  const emailInput = (page: any) => page.locator('input[name="email"]');
  const roleInput  = (page: any) => page.locator('input[name="role"]');
  const bioInput   = (page: any) => page.locator('textarea[name="bio"]');

  // ---------------------------------------------------------------------------
  // Header
  // ---------------------------------------------------------------------------

  test('renders the page heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible();
  });

  test('renders the subtitle', async ({ page }) => {
    await expect(page.getByText(/manage your personal information/i)).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Avatar
  // ---------------------------------------------------------------------------

  test('renders avatar with the first letter of the default name', async ({ page }) => {
    // Default name is "Jane Doe" → avatar shows "J"
    await expect(page.getByText('J').first()).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Form — default values
  // ---------------------------------------------------------------------------

  test('name input has the default value', async ({ page }) => {
    await expect(nameInput(page)).toHaveValue('Jane Doe');
  });

  test('email input has the default value', async ({ page }) => {
    await expect(emailInput(page)).toHaveValue('jane.doe@example.com');
  });

  test('role input has the default value', async ({ page }) => {
    await expect(roleInput(page)).toHaveValue('Product Manager');
  });

  test('bio textarea has the default value', async ({ page }) => {
    await expect(bioInput(page)).toHaveValue(
      'Building great products one sprint at a time.',
    );
  });

  test('renders the Save changes button', async ({ page }) => {
    await expect(page.getByRole('button', { name: /save changes/i })).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Form interactions
  // ---------------------------------------------------------------------------

  test('editing the name field updates the input value', async ({ page }) => {
    await nameInput(page).fill('John Smith');
    await expect(nameInput(page)).toHaveValue('John Smith');
  });

  test('editing the email field updates the input value', async ({ page }) => {
    await emailInput(page).fill('john@example.com');
    await expect(emailInput(page)).toHaveValue('john@example.com');
  });

  test('editing the name updates the avatar letter', async ({ page }) => {
    await nameInput(page).fill('Oliver');
    await expect(page.getByText('O').first()).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Save state machine
  // ---------------------------------------------------------------------------

  test('Saved! is not visible before form submission', async ({ page }) => {
    await expect(page.getByText('Saved!')).not.toBeVisible();
  });

  test('Saved! appears after clicking Save changes', async ({ page }) => {
    await page.getByRole('button', { name: /save changes/i }).click();
    await expect(page.getByText('Saved!')).toBeVisible();
  });

  test('Saved! disappears after editing a field post-save', async ({ page }) => {
    await page.getByRole('button', { name: /save changes/i }).click();
    await expect(page.getByText('Saved!')).toBeVisible();

    await nameInput(page).fill('Jane Edited');
    await expect(page.getByText('Saved!')).not.toBeVisible();
  });

  test('Saved! reappears after saving a second time', async ({ page }) => {
    await page.getByRole('button', { name: /save changes/i }).click();
    await nameInput(page).fill('Jane V2');
    await page.getByRole('button', { name: /save changes/i }).click();
    await expect(page.getByText('Saved!')).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Remote identifier (confirms content is served by mfe-profile)
  // ---------------------------------------------------------------------------

  test('shows the mfe-profile remote identifier', async ({ page }) => {
    await expect(page.getByText(/mfe-profile/)).toBeVisible();
  });

  test('remote identifier mentions port 3002', async ({ page }) => {
    await expect(page.getByText(/3002/)).toBeVisible();
  });

  // ---------------------------------------------------------------------------
  // Navigation still present
  // ---------------------------------------------------------------------------

  test('navigation bar is present on the profile page', async ({ page }) => {
    await expect(page.getByText('MFE Demo')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Profile' })).toBeVisible();
  });
});
