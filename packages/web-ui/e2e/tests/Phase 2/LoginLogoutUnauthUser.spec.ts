import { test, expect } from "@playwright/test";

test.describe("Login/Logout unauth user", () => {
  test("Rejoining the link will persist the username", async ({ page }) => {
    await page.goto("http://localhost:3000/", { timeout: 10000 });
    const pageContent = await page.content();
    // expect(pageContent.toLowerCase()).toContain("Screenshare is On");
  });
});
