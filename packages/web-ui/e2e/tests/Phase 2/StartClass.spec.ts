import { test, expect } from "@playwright/test";

test.describe("Start a class", () => {
  test("Capture streams from the camera and microphone ", async ({ page }) => {
    await page.goto("http://localhost:3000/", { timeout: 10000 });
    const pageContent = await page.content();
    // expect(pageContent.toLowerCase()).toContain("Audio Off");
  });
});
