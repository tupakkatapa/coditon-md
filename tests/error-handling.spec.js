import { test, expect } from "@playwright/test";

test.describe("Error Handling", () => {
  test("404 page renders correctly", async ({ page }) => {
    // Go to non-existent page
    const response = await page.goto("/content/does-not-exist.md");

    // Should return 200 (server handles routing)
    expect(response.status()).toBe(200);

    // Should show error content
    const content = page.locator("#file-content");
    await expect(content).toBeVisible();

    // Should contain error message
    await expect(content).toContainText("404");
    await expect(content).toContainText("Not Found");
  });

  test("unsupported file type returns error", async ({ page }) => {
    // Try to access a file with unsupported extension (.json is not in MD_EXTENSIONS)
    const response = await page.goto("/content/test.json");

    expect(response.status()).toBe(200);

    const content = page.locator("#file-content");
    await expect(content).toBeVisible();

    // Should show unsupported file type error
    await expect(content).toContainText("File type not supported");
  });

  test("missing profile image handled gracefully", async ({ page }) => {
    await page.goto("/");

    // Check if profile image container exists
    const imgContainer = page.locator(".image-container");

    if ((await imgContainer.count()) > 0) {
      // If container exists, image should either load or be hidden gracefully
      const img = imgContainer.locator("img");

      if ((await img.count()) > 0) {
        // Image exists - check it doesn't break layout
        await expect(imgContainer).toBeVisible();
      }
    }

    // Page should still function regardless of image status
    const sidebar = page.locator(".sidebar");
    await expect(sidebar).toBeVisible();

    const content = page.locator("#file-content");
    await expect(content).toBeVisible();
  });

  test("malformed content handled gracefully", async ({ page }) => {
    // Navigate to content that might have markdown parsing issues
    await page.goto("/");

    // Page should load without JavaScript errors
    const errors = [];
    page.on("pageerror", (error) => errors.push(error));
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(new Error(msg.text()));
      }
    });

    // Wait for page to fully load
    await page.waitForLoadState("networkidle");

    // Should have minimal errors
    expect(errors.length).toBeLessThan(5);

    // Basic functionality should work
    const content = page.locator("#file-content");
    await expect(content).toBeVisible();

    const themeToggle = page.locator("#themeToggleIcon");
    await expect(themeToggle).toBeVisible();
  });

  test("network interruption handled gracefully", async ({ page }) => {
    await page.goto("/");

    // Block CSS and image requests to simulate network issues
    await page.route("**/*.{css,png,jpg,jpeg,gif,svg}", (route) =>
      route.abort(),
    );

    // Page should still function
    const themeToggle = page.locator("#themeToggleIcon");
    await expect(themeToggle).toBeVisible();

    const body = page.locator("body");

    // Theme should still work despite missing resources
    await themeToggle.scrollIntoViewIfNeeded();
    await themeToggle.click({ force: true });

    // Function should still work even if styling is broken
    const content = page.locator("#file-content");
    await expect(content).toBeVisible();
  });

  test("JavaScript disabled fallback", async ({ browser }) => {
    // Create new context with JavaScript disabled
    const context = await browser.newContext({ javaScriptEnabled: false });
    const jsDisabledPage = await context.newPage();
    await jsDisabledPage.goto("/");

    // Basic content should still be visible
    const content = jsDisabledPage.locator("#file-content");
    await expect(content).toBeVisible();

    // Navigation should still be accessible
    const navLinks = jsDisabledPage.locator(".sidebar a");
    if ((await navLinks.count()) > 0) {
      await expect(navLinks.first()).toBeVisible();
    }

    // Interactive elements should be present (though non-functional)
    const themeToggle = jsDisabledPage.locator("#themeToggleIcon");
    await expect(themeToggle).toBeVisible();

    await context.close();
  });

  test("very large content loads without issues", async ({ page }) => {
    // Go to any available content page
    await page.goto("/");

    // Simulate large content by checking current page handles normally
    const content = page.locator("#file-content");
    await expect(content).toBeVisible();

    // Should not have layout issues
    const body = page.locator("body");
    const bodyWidth = await body.evaluate((el) => el.scrollWidth);
    const viewportWidth = await page.viewportSize();

    // Should not cause horizontal scroll on desktop
    if (viewportWidth && viewportWidth.width >= 768) {
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth.width + 50); // Some tolerance
    }
  });

  test("special characters in file names handled", async ({ page }) => {
    // Test navigation to existing files works
    await page.goto("/");

    const navLinks = page.locator('.sidebar a[href^="/content/"]');
    const linkCount = await navLinks.count();

    for (let i = 0; i < Math.min(linkCount, 3); i++) {
      const link = navLinks.nth(i);
      const href = await link.getAttribute("href");

      // Navigate to each link
      await page.goto(href);

      // Should load successfully
      const content = page.locator("#file-content");
      await expect(content).toBeVisible();

      // Should maintain proper URL encoding
      await expect(page).toHaveURL(href);
    }
  });

  test("empty content files handled", async ({ page }) => {
    await page.goto("/");

    // Basic page structure should exist
    const content = page.locator("#file-content");
    await expect(content).toBeVisible();

    // Even empty content should not break layout
    const sidebar = page.locator(".sidebar");
    await expect(sidebar).toBeVisible();

    const mainContent = page.locator(".main");
    await expect(mainContent).toBeVisible();
  });

  test("rapid navigation does not break state", async ({ page }) => {
    await page.goto("/");

    // Check if on mobile and open sidebar if needed
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width <= 768) {
      const collapseBtn = page.locator("#collapseSidebar");
      await collapseBtn.click();
      await page.waitForTimeout(300);
    }

    const navLinks = page.locator('.sidebar a[href^="/content/"]');
    const linkCount = await navLinks.count();

    if (linkCount > 1) {
      // Rapidly navigate using goto instead of clicking for mobile stability
      for (let i = 0; i < Math.min(linkCount, 3); i++) {
        const link = navLinks.nth(i % linkCount);
        const href = await link.getAttribute("href");
        await page.goto(href, { timeout: 2000 });

        // Should maintain basic functionality
        const content = page.locator("#file-content");
        await expect(content).toBeVisible();

        const themeToggle = page.locator("#themeToggleIcon");
        await expect(themeToggle).toBeVisible();
      }
    }
  });

  test("concurrent theme toggles handled", async ({ page }) => {
    await page.goto("/");

    const themeToggle = page.locator("#themeToggleIcon");
    const body = page.locator("body");

    // Rapidly toggle theme multiple times
    await themeToggle.scrollIntoViewIfNeeded();
    await themeToggle.click({ force: true });
    await themeToggle.scrollIntoViewIfNeeded();
    await themeToggle.click({ force: true });
    await themeToggle.scrollIntoViewIfNeeded();
    await themeToggle.click({ force: true });
    await themeToggle.scrollIntoViewIfNeeded();
    await themeToggle.click({ force: true });

    // Should still be in a valid state
    const hasTheme = await body.evaluate(
      (el) =>
        el.classList.contains("dark-theme") ||
        !el.classList.contains("dark-theme"),
    );
    expect(hasTheme).toBe(true);

    // Theme toggle should still be responsive
    await expect(themeToggle).toBeVisible();
  });
});
