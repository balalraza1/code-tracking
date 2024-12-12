import { test, expect } from "@playwright/test";

test.describe("Audio/Video controls", () => {
  test("Audio on/off control", async ({ page }) => {
    await page.goto("http://localhost:3000/", { timeout: 10000 });
    const pageContent = await page.content();
    expect(pageContent.toLowerCase()).toContain("Audio Off");
  });
  test("Video on/off control", async ({ page }) => {
    await page.goto("http://localhost:3000/", { timeout: 10000 });
    const pageContent = await page.content();
    expect(pageContent.toLowerCase()).toContain("Video Off");
  });
});
