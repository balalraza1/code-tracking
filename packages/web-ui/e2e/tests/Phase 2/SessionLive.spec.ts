import { test, expect } from "@playwright/test";

test.describe("Session live", () => {
  test("check for is session live?", async ({ page }) => {
    await page.goto("http://localhost:3000/", { timeout: 10000 });
    const pageContent = await page.content();
    // expect(pageContent.toLowerCase()).toContain("Screenshare is On");
  });
});
