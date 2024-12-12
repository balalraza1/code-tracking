import { test, expect } from "@playwright/test";

test.describe("Remove user", () => {
  test("remove user from stage", async ({ page }) => {
    await page.goto("http://localhost:3000/", { timeout: 10000 });
    const pageContent = await page.content();
    // expect(pageContent.toLowerCase()).toContain("Screenshare is On");
  });
});
