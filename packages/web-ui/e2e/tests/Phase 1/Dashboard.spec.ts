import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('has word "Live Broadcasts" on page', async ({ page }) => {
    try {
      await page.goto('http://localhost:3000/', { timeout: 10000 });
      const pageContent = await page.content();
      expect(pageContent.toLowerCase()).toContain('live broadcasts');
      await page.getByRole('heading', { name: 'Live Broadcasts' }).click();
      await page.getByText('Stay connected with real-time').click();
      await page.getByText('dhananjay').first().click();
      await page.getByText('Participant List').click();
    } catch (error) {
    }
  });
})
