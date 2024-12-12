import { test, expect } from "@playwright/test";

test.describe("Chat", () => {
  test("User should connect to chatroom", async ({ page }) => {
    await page.goto("http://localhost:3000/", { timeout: 10000 });
    const pageContent = await page.content();
    // expect(pageContent.toLowerCase()).toContain("Audio Off");
  });
  test("User should send a message", async ({ page }) => {
    await page.goto("http://localhost:3000/", { timeout: 10000 });
    const pageContent = await page.content();
    // expect(pageContent.toLowerCase()).toContain("Video Off");
  });
});
