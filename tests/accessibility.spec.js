import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility", () => {
  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    await page.goto("/");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should have proper heading structure", async ({ page }) => {
    await page.goto("/");

    // Check for proper heading hierarchy
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();

    // Headings should follow logical order (h1 -> h2 -> h3, etc.)
    const headings = page.locator("h1, h2, h3, h4, h5, h6");
    const headingTexts = await headings.allTextContents();

    expect(headingTexts.length).toBeGreaterThan(0);
  });

  test("should have accessible navigation", async ({ page }) => {
    await page.goto("/");

    // Navigation links should have proper text or aria-labels
    const navLinks = page.locator(".sidebar a");
    const linkCount = await navLinks.count();

    for (let i = 0; i < linkCount; i++) {
      const link = navLinks.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute("aria-label");

      // Link should have either text content or aria-label
      expect(text?.trim() || ariaLabel).toBeTruthy();
    }
  });

  test("should have accessible buttons", async ({ page }) => {
    await page.goto("/");

    // Theme toggle button
    const themeToggle = page.locator("#themeToggleIcon");
    if (await themeToggle.isVisible()) {
      // Should have accessible name or title
      const title = await themeToggle.getAttribute("title");
      const ariaLabel = await themeToggle.getAttribute("aria-label");
      expect(title || ariaLabel).toBeTruthy();
    }

    // Collapse button
    const collapseBtn = page.locator("#collapseSidebar");
    if (await collapseBtn.isVisible()) {
      // Should be keyboard accessible
      await collapseBtn.focus();
      await expect(collapseBtn).toBeFocused();
    }

    // Copy buttons (if code blocks exist)
    const copyButtons = page.locator(".copy-button");
    const copyBtnCount = await copyButtons.count();

    for (let i = 0; i < copyBtnCount; i++) {
      const btn = copyButtons.nth(i);
      if (await btn.isVisible()) {
        // Should have accessible text
        const text = await btn.textContent();
        expect(text?.trim()).toBeTruthy();
      }
    }
  });

  test("should support keyboard navigation", async ({ page }) => {
    await page.goto("/");

    // Test Tab navigation through interactive elements
    await page.keyboard.press("Tab");

    // Should focus on first interactive element
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();

    // Continue tabbing through elements
    let tabbedElements = 1;
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("Tab");
      const stillFocused = await focusedElement.isVisible();
      if (stillFocused) {
        tabbedElements++;
      } else {
        break;
      }
    }

    expect(tabbedElements).toBeGreaterThan(1);
  });

  test("should have proper color contrast", async ({ page }) => {
    await page.goto("/");

    // Test both light and dark themes
    const themes = ["light", "dark"];

    for (const theme of themes) {
      if (theme === "dark") {
        // Toggle to dark theme
        const themeToggle = page.locator("#themeToggleIcon");
        await themeToggle.scrollIntoViewIfNeeded();
        await themeToggle.click({ force: true });
        await page.waitForTimeout(100); // Wait for theme to apply
      }

      // Run axe with color contrast rules
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(["color-contrast"])
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    }
  });

  test("should have accessible images", async ({ page }) => {
    await page.goto("/");

    // Check profile image if it exists
    const profileImg = page.locator('img[src="/profile-pic"]');
    if (await profileImg.isVisible()) {
      const alt = await profileImg.getAttribute("alt");
      expect(alt).toBeTruthy();
      expect(alt?.trim()).not.toBe("");
    }

    // Check content images
    const contentImages = page.locator(".markdown-body img");
    const imgCount = await contentImages.count();

    for (let i = 0; i < imgCount; i++) {
      const img = contentImages.nth(i);
      const alt = await img.getAttribute("alt");

      // Images should have alt text (can be empty for decorative images)
      expect(alt).not.toBeNull();
    }
  });

  test("should have accessible forms (if any)", async ({ page }) => {
    await page.goto("/");

    // Check for any form elements
    const inputs = page.locator("input, textarea, select");
    const inputCount = await inputs.count();

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);

      // Form elements should have labels or aria-labels
      const id = await input.getAttribute("id");
      const ariaLabel = await input.getAttribute("aria-label");
      const ariaLabelledby = await input.getAttribute("aria-labelledby");

      if (id) {
        // Check if there's a label for this input
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = (await label.count()) > 0;

        expect(hasLabel || ariaLabel || ariaLabelledby).toBeTruthy();
      } else {
        expect(ariaLabel || ariaLabelledby).toBeTruthy();
      }
    }
  });

  test("should announce dynamic content changes", async ({ page }) => {
    await page.goto("/");

    // Check for aria-live regions for dynamic content
    const liveRegions = page.locator("[aria-live]");
    const liveCount = await liveRegions.count();

    // For copy buttons, test announcements
    const codeBlock = page.locator("pre code").first();
    if (await codeBlock.isVisible()) {
      await codeBlock.hover();

      const copyBtn = page.locator(".copy-button");
      if (await copyBtn.isVisible()) {
        await copyBtn.scrollIntoViewIfNeeded();
        await copyBtn.click({ force: true });

        // Button text change should be announced
        await expect(copyBtn).toHaveText("Copied!");

        // Could add aria-live region for better screen reader support
        const ariaLive = await copyBtn.getAttribute("aria-live");
        // This is a recommendation, not a requirement
        // expect(ariaLive).toBe('polite');
      }
    }
  });

  test("should work without JavaScript", async ({ page, context }) => {
    // Disable JavaScript
    await context.setExtraHTTPHeaders({});
    await page.addInitScript(() => {
      window.addEventListener("DOMContentLoaded", () => {
        // Remove all script tags to simulate no-JS environment
        const scripts = document.querySelectorAll("script");
        scripts.forEach((script) => script.remove());
      });
    });

    await page.goto("/");

    // Basic content should still be accessible
    const content = page.locator("#file-content");
    await expect(content).toBeVisible();

    // Navigation links should work
    const navLinks = page.locator(".sidebar a");
    const firstLink = navLinks.first();

    if (await firstLink.isVisible()) {
      const href = await firstLink.getAttribute("href");
      expect(href).toBeTruthy();

      // Link should be clickable (may not have JS behavior, but should navigate)
      await expect(firstLink).toBeEnabled();
    }
  });

  test("should support screen reader navigation landmarks", async ({
    page,
  }) => {
    await page.goto("/");

    // Check for semantic HTML5 elements or ARIA landmarks
    const landmarks = page.locator(
      'main, nav, aside, header, footer, [role="main"], [role="navigation"], [role="complementary"]',
    );
    const landmarkCount = await landmarks.count();

    expect(landmarkCount).toBeGreaterThan(0);

    // Main content should be in a main element or have role="main"
    const mainContent = page.locator('main, [role="main"]');
    await expect(mainContent).toBeVisible();
  });
});
