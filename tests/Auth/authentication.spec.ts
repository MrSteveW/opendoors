import { setupClerkTestingToken } from '@clerk/testing/playwright';
import { test, expect } from '@playwright/test';

test.describe('Sign-in to Drake', () => {
  test.beforeEach(async ({ page }) => {
    await setupClerkTestingToken({ page });
    await page.goto('/sign-in/drake');
    await page.waitForSelector('.cl-signIn-root', { state: 'attached' });
  });

  test('shows Clerk sign-in form', async ({ page }) => {
    await expect(page.locator('.cl-card')).toBeVisible({ timeout: 10000 });
    const usernameInput = page.locator('input[name=identifier]');
    await expect(usernameInput).toBeVisible();
  });

  test('shows guest button', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Guest' })).toBeVisible();
  });
});
