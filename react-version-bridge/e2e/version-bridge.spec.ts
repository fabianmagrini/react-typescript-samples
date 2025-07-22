import { test, expect } from '@playwright/test';

test.describe('React Version Bridge E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays host application with React 19', async ({ page }) => {
    await expect(page.getByText('Host Application (React 19)')).toBeVisible();
    await expect(page.getByText(/Using React Version:/)).toBeVisible();
    
    // Check that host shows React 19 version
    const versionText = await page.getByText(/Using React Version:/).textContent();
    expect(versionText).toMatch(/19\./);
  });

  test('loads legacy remote with React 18 via Web Component', async ({ page }) => {
    // Wait for Web Component to load
    await expect(page.getByText('Loading Legacy Remote (Web Component Bridge)')).toBeVisible();
    
    // Wait for the actual remote content
    await expect(page.getByText('I am the Legacy Remote App (React 18)')).toBeVisible({ timeout: 10000 });
    
    // Check React version in legacy remote
    const legacyVersion = await page.locator('text=/My React version is:.*18\./').textContent();
    expect(legacyVersion).toMatch(/18\./);
    
    // Check bridge pattern indicator
    await expect(page.getByText('(Running on React 18 via Bridge Pattern)')).toBeVisible();
  });

  test('loads latest remote with React 19 via singleton', async ({ page }) => {
    // Wait for latest remote to load
    await expect(page.getByText('I am the Latest Remote App (React 19)')).toBeVisible({ timeout: 10000 });
    
    // Check React version in latest remote
    const latestVersion = await page.locator('text=/My React version is:.*19\./').textContent();
    expect(latestVersion).toMatch(/19\./);
    
    // Check singleton pattern indicator  
    await expect(page.getByText('(This should match the host\'s version)')).toBeVisible();
  });

  test('shows correct visual styling for each section', async ({ page }) => {
    // Host has blue border
    const hostSection = page.locator('div').filter({ hasText: 'Host Application (React 19)' }).first();
    await expect(hostSection).toHaveCSS('border', '2px solid rgb(0, 0, 255)');
    
    // Legacy section has green dashed border
    const legacySection = page.locator('div').filter({ hasText: 'Loading Legacy Remote (Web Component Bridge)' }).first();
    await expect(legacySection).toHaveCSS('border', '2px dashed rgb(0, 128, 0)');
    
    // Latest section has purple dashed border
    const latestSection = page.locator('div').filter({ hasText: 'Loading Latest Remote (Singleton Pattern)' }).first();
    await expect(latestSection).toHaveCSS('border', '2px dashed rgb(128, 0, 128)');
  });

  test('verifies React version isolation', async ({ page }) => {
    // Wait for all components to load
    await expect(page.getByText('I am the Legacy Remote App (React 18)')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('I am the Latest Remote App (React 19)')).toBeVisible({ timeout: 10000 });
    
    // Get all version texts
    const hostVersion = await page.getByText(/Using React Version:/).textContent();
    const legacyVersion = await page.locator('[style*="border: 1px solid green"] >> text=/My React version is:/').textContent();
    const latestVersion = await page.locator('[style*="border: 1px solid purple"] >> text=/My React version is:/').textContent();
    
    // Verify version isolation
    expect(hostVersion).toMatch(/19\./);
    expect(legacyVersion).toMatch(/18\./);  // Should be different (isolated)
    expect(latestVersion).toMatch(/19\./);  // Should match host (singleton)
    
    // Legacy should be different from host
    expect(legacyVersion).not.toBe(hostVersion);
  });

  test('handles loading states correctly', async ({ page }) => {
    // Should show loading states initially
    await expect(page.getByText('Loading Legacy Remote via Web Component Bridge...')).toBeVisible();
    await expect(page.getByText('Loading Latest Remote...')).toBeVisible();
    
    // Loading states should disappear when components load
    await expect(page.getByText('Loading Legacy Remote via Web Component Bridge...')).not.toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Loading Latest Remote...')).not.toBeVisible({ timeout: 10000 });
  });

  test('checks for JavaScript errors in console', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    // Wait for all components to load
    await expect(page.getByText('I am the Legacy Remote App (React 18)')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('I am the Latest Remote App (React 19)')).toBeVisible({ timeout: 10000 });
    
    // Filter out known acceptable errors (if any)
    const significantErrors = errors.filter(error => 
      !error.includes('favicon.ico') && // Ignore favicon errors
      !error.includes('DevTools') // Ignore DevTools related errors
    );
    
    expect(significantErrors).toHaveLength(0);
  });

  test('validates network requests for module federation', async ({ page }) => {
    const requests: string[] = [];
    
    page.on('request', (request) => {
      const url = request.url();
      if (url.includes('remoteEntry.js') || url.includes('react') || url.includes('chunk')) {
        requests.push(url);
      }
    });
    
    // Wait for page to load completely
    await expect(page.getByText('I am the Legacy Remote App (React 18)')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('I am the Latest Remote App (React 19)')).toBeVisible({ timeout: 10000 });
    
    // Should have loaded remote entry points
    const remoteEntryRequests = requests.filter(url => url.includes('remoteEntry.js'));
    expect(remoteEntryRequests.length).toBeGreaterThan(0);
    
    // Should have requests to both remote ports
    const hasPort3001 = requests.some(url => url.includes(':3001'));
    const hasPort3002 = requests.some(url => url.includes(':3002'));
    
    expect(hasPort3001).toBe(true);
    expect(hasPort3002).toBe(true);
  });
});