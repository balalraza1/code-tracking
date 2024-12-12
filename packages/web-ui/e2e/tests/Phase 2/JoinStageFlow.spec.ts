import { test, expect } from "@playwright/test";

test.describe("Join a stage flow", () => {
  test("Start Broadcast", async ({ page }) => {
    await page.goto("http://localhost:3000/", { timeout: 10000 });
    const pageContent = await page.content();
    // expect(pageContent.toLowerCase()).toContain("Screenshare is On");
  });
  test("Start Broadcast,raise a hand", async ({ page }) => {
    await page.goto("http://localhost:3000/", { timeout: 10000 });
    const pageContent = await page.content();
    // expect(pageContent.toLowerCase()).toContain("Screenshare is On");
  });
  test("Start Broadcast,invite participant", async ({ page }) => {
    await page.goto("http://localhost:3000/", { timeout: 10000 });
    const pageContent = await page.content();
    // expect(pageContent.toLowerCase()).toContain("Screenshare is On");
  });
  test("Start Broadcast,user can directly join", async ({ page }) => {
    await page.goto("http://localhost:3000/", { timeout: 10000 });
    const pageContent = await page.content();
    // expect(pageContent.toLowerCase()).toContain("Screenshare is On");
  });
});
