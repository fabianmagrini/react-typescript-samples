import { test, expect } from '@playwright/test';

test.describe('Micro-Frontend App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display login page when not authenticated', async ({ page }) => {
    await expect(page.getByText('Welcome')).toBeVisible();
    await expect(page.getByText('Sign in to access your micro-frontend application')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  });

  test('should login and navigate to dashboard', async ({ page }) => {
    // Click sign in button
    await page.click('button:has-text("Sign In")');
    
    // Should redirect to dashboard
    await expect(page.getByText('Dashboard')).toBeVisible();
    await expect(page.getByText('Welcome to your micro-frontend dashboard')).toBeVisible();
    
    // Check navigation
    await expect(page.getByText('Dashboard')).toBeVisible();
    await expect(page.getByText('Profile')).toBeVisible();
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.getByText('Orders')).toBeVisible();
  });

  test('should navigate between pages', async ({ page }) => {
    // Login first
    await page.click('button:has-text("Sign In")');
    await expect(page.getByText('Dashboard')).toBeVisible();
    
    // Navigate to Profile
    await page.click('a:has-text("Profile")');
    await expect(page.getByText('Manage your account settings')).toBeVisible();
    
    // Navigate to Products
    await page.click('a:has-text("Products")');
    await expect(page.getByText('Browse our product catalog')).toBeVisible();
    
    // Navigate to Orders
    await page.click('a:has-text("Orders")');
    await expect(page.getByText('Track your orders and view purchase history')).toBeVisible();
  });

  test('should toggle sidebar', async ({ page }) => {
    // Login first
    await page.click('button:has-text("Sign In")');
    
    // Check if sidebar is visible (desktop view)
    if (await page.getByText('Dashboard').nth(1).isVisible()) {
      // Toggle sidebar
      await page.click('button:has-text("☰")');
      
      // Sidebar should still work (this tests the toggle functionality)
      await expect(page.getByText('Dashboard')).toBeVisible();
    }
  });

  test('should display user information', async ({ page }) => {
    // Login first
    await page.click('button:has-text("Sign In")');
    
    // Check if user name is displayed
    await expect(page.getByText('Welcome, John Doe')).toBeVisible();
    
    // Check logout button
    await expect(page.getByText('Logout')).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.click('button:has-text("Sign In")');
    await expect(page.getByText('Dashboard')).toBeVisible();
    
    // Logout
    await page.click('button:has-text("Logout")');
    
    // Should redirect to login page
    await expect(page.getByText('Welcome')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  });

  test('should load remote components', async ({ page }) => {
    // Login first
    await page.click('button:has-text("Sign In")');
    
    // Navigate to Products (remote component)
    await page.click('a:has-text("Products")');
    
    // Wait for remote component to load
    await expect(page.getByText('Browse our product catalog')).toBeVisible();
    
    // Navigate to Orders (remote component)
    await page.click('a:has-text("Orders")');
    
    // Wait for remote component to load
    await expect(page.getByText('Track your orders and view purchase history')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Login
    await page.click('button:has-text("Sign In")');
    
    // Check if mobile layout works
    await expect(page.getByText('Dashboard')).toBeVisible();
    
    // Toggle sidebar on mobile
    await page.click('button:has-text("☰")');
    
    // Navigation should still be accessible
    await expect(page.getByText('Profile')).toBeVisible();
  });
});