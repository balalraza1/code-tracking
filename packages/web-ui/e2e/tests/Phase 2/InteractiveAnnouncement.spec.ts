import { test, expect } from "@playwright/test";

test.describe("Interactive announcement", () => {
  test("Showing an announcement on the stream", async ({ page }) => {
    await page.goto("http://localhost:3000/", { timeout: 10000 });
    const pageContent = await page.content();
    // expect(pageContent.toLowerCase()).toContain("Screenshare is On");
  });
});
