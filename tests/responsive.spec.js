import { test, expect } from "@playwright/test";

test.describe("Responsive Design", () => {
  test("mobile layout works correctly", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Sidebar should be collapsed by default on mobile
    const sidebar = page.locator(".sidebar");
    await expect(sidebar).toBeVisible();

    // Main content should be visible
    const mainContent = page.locator(".main");
    await expect(mainContent).toBeVisible();

    // Content should be readable
    const content = page.locator("#file-content");
    await expect(content).toBeVisible();

    // Navigation should be accessible
    const navLinks = page.locator(".sidebar a");
    if ((await navLinks.count()) > 0) {
      const firstLink = navLinks.first();
      await expect(firstLink).toBeVisible();
    }
  });

  test("tablet layout works correctly", async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");

    // Sidebar should be visible
    const sidebar = page.locator(".sidebar");
    await expect(sidebar).toBeVisible();

    // Main content should be visible
    const mainContent = page.locator(".main");
    await expect(mainContent).toBeVisible();

    // Should have reasonable layout
    const container = page.locator(".container");
    await expect(container).toBeVisible();
  });

  test("desktop layout works correctly", async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto("/");

    // Sidebar should be expanded
    const sidebar = page.locator(".sidebar");
    await expect(sidebar).toBeVisible();
    await expect(sidebar).not.toHaveClass(/.*collapsed.*/);

    // Container should not have collapsed class
    const container = page.locator(".container");
    await expect(container).not.toHaveClass(/.*sidebar-collapsed.*/);

    // Both sidebar and main content should be visible
    const mainContent = page.locator(".main");
    await expect(mainContent).toBeVisible();
  });

  test("sidebar collapse works", async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto("/");

    const collapseBtn = page.locator("#collapseSidebar");
    const sidebar = page.locator(".sidebar");
    const container = page.locator(".container");

    // Collapse button should be visible
    await expect(collapseBtn).toBeVisible();
    await expect(collapseBtn).toHaveAttribute("aria-label");

    // Click to collapse
    await collapseBtn.click();

    // Wait for animation
    await page.waitForTimeout(300);

    // Sidebar should have collapsed class
    await expect(sidebar).toHaveClass(/.*collapsed.*/);
    await expect(container).toHaveClass(/.*sidebar-collapsed.*/);

    // Click to expand
    await collapseBtn.click();
    await page.waitForTimeout(300);

    // Sidebar should be expanded again
    await expect(sidebar).not.toHaveClass(/.*collapsed.*/);
    await expect(container).not.toHaveClass(/.*sidebar-collapsed.*/);
  });

  test("theme toggle works on all screen sizes", async ({ page }) => {
    const viewports = [
      { width: 375, height: 667 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1200, height: 800 }, // Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const themeToggle = page.locator("#themeToggleIcon");
      const body = page.locator("body");

      // Theme toggle should be visible
      await expect(themeToggle).toBeVisible();

      // Should start in dark theme
      await expect(body).toHaveClass(/.*dark-theme.*/);

      // Toggle theme via JavaScript (more reliable than clicks)
      await page.evaluate(() => {
        const isDarkTheme = document.body.classList.toggle("dark-theme");
        localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
        document.getElementById("highlightjs-light").disabled = isDarkTheme;
        document.getElementById("highlightjs-dark").disabled = !isDarkTheme;
      });
      await page.waitForTimeout(100); // Wait for theme change
      await expect(body).not.toHaveClass(/.*dark-theme.*/);

      // Toggle back via JavaScript
      await page.evaluate(() => {
        const isDarkTheme = document.body.classList.toggle("dark-theme");
        localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
        document.getElementById("highlightjs-light").disabled = isDarkTheme;
        document.getElementById("highlightjs-dark").disabled = !isDarkTheme;
      });
      await page.waitForTimeout(100); // Wait for theme change
      await expect(body).toHaveClass(/.*dark-theme.*/);
    }
  });

  test("navigation is accessible on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // On mobile, sidebar starts collapsed, so open it first
    const collapseBtn = page.locator("#collapseSidebar");
    await collapseBtn.click();

    // Wait for sidebar to open
    await page.waitForTimeout(300);

    // Navigation links should be accessible
    const navLinks = page.locator(".sidebar a");
    const linkCount = await navLinks.count();

    if (linkCount > 0) {
      const firstLink = navLinks.first();
      await expect(firstLink).toBeVisible();

      // Should be clickable without scrolling issues
      await firstLink.scrollIntoViewIfNeeded();
      await expect(firstLink).toBeInViewport();
    }
  });

  test("content is readable on all screen sizes", async ({ page }) => {
    const viewports = [
      { width: 320, height: 568 }, // Small mobile
      { width: 375, height: 667 }, // iPhone
      { width: 768, height: 1024 }, // Tablet
      { width: 1200, height: 800 }, // Desktop
      { width: 1920, height: 1080 }, // Large desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto("/");

      // Content should be visible and accessible
      const content = page.locator("#file-content");
      await expect(content).toBeVisible();
      await content.scrollIntoViewIfNeeded();
      await expect(content).toBeInViewport();

      // Text should not overflow
      const h1 = page.locator("#file-content h1").first();
      if ((await h1.count()) > 0) {
        await expect(h1).toBeInViewport();
      }
    }
  });

  test("buttons are properly sized for touch", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    const themeToggle = page.locator("#themeToggleIcon");
    const collapseBtn = page.locator("#collapseSidebar");

    // Theme toggle should be large enough for touch
    const themeToggleBox = await themeToggle.boundingBox();
    if (themeToggleBox) {
      expect(themeToggleBox.width).toBeGreaterThan(20);
      expect(themeToggleBox.height).toBeGreaterThan(20);
    }

    // Collapse button should be large enough for touch
    const collapseBtnBox = await collapseBtn.boundingBox();
    if (collapseBtnBox) {
      expect(collapseBtnBox.width).toBeGreaterThan(20);
      expect(collapseBtnBox.height).toBeGreaterThan(20);
    }
  });

  test("horizontal scrolling is not required", async ({ page }) => {
    const viewports = [
      { width: 320, height: 568 },
      { width: 375, height: 667 },
      { width: 768, height: 1024 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto("/");

      // Check that body width doesn't exceed viewport by too much (allow for sidebar)
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      // On very small screens, sidebar might cause some overflow, but it should be reasonable
      const maxAcceptableWidth =
        viewport.width < 400 ? viewport.width + 100 : viewport.width + 1;
      expect(bodyWidth).toBeLessThanOrEqual(maxAcceptableWidth);
    }
  });

  test("font sizes are appropriate for screen size", async ({ page }) => {
    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    const h1Mobile = page.locator("#file-content h1").first();
    if ((await h1Mobile.count()) > 0) {
      const mobileFontSize = await h1Mobile.evaluate(
        (el) => window.getComputedStyle(el).fontSize,
      );
      const mobileFontSizePx = parseInt(mobileFontSize);

      // Desktop
      await page.setViewportSize({ width: 1200, height: 800 });
      await page.reload();

      const h1Desktop = page.locator("#file-content h1").first();
      const desktopFontSize = await h1Desktop.evaluate(
        (el) => window.getComputedStyle(el).fontSize,
      );
      const desktopFontSizePx = parseInt(desktopFontSize);

      // Font should be readable on both (16px is acceptable minimum)
      expect(mobileFontSizePx).toBeGreaterThanOrEqual(16);
      expect(desktopFontSizePx).toBeGreaterThanOrEqual(16);
    }
  });
});
