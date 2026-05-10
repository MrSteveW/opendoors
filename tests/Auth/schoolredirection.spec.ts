import { test, expect } from '@playwright/test';

test('has two tenant links', async ({ page }) => {
  await page.goto('/sign-in');
  await expect(page.locator('a[href="/sign-in/drake"]')).toHaveCount(1);
  await expect(page.locator('a[href="/sign-in/wicklewood"]')).toHaveCount(1);
});
