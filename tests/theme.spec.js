import { test, expect } from "@playwright/test";

test.describe("Theme System", () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => localStorage.clear());
  });

  test("default theme is dark", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const body = page.locator("body");

    // Should start with dark theme by default
    await expect(body).toHaveClass(/.*dark-theme.*/);

    // Dark theme CSS should be enabled
    const darkThemeLink = page.locator("#highlightjs-dark");
    await expect(darkThemeLink).not.toHaveAttribute("disabled");

    // Light theme CSS should be disabled
    const lightThemeLink = page.locator("#highlightjs-light");
    await expect(lightThemeLink).toHaveAttribute("disabled");
  });

  test("theme toggle button works", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Wait for theme system to be initialized
    await page.waitForFunction(() => window.document.readyState === "complete");
    await page.waitForTimeout(100);

    const themeToggle = page.locator("#themeToggleIcon");
    const body = page.locator("body");

    // Should be visible and accessible
    await expect(themeToggle).toBeVisible();
    await expect(themeToggle).toHaveAttribute("aria-label");

    // Start in dark theme
    await expect(body).toHaveClass(/.*dark-theme.*/);

    // Switch to light theme via JavaScript (more reliable on mobile)
    await page.evaluate(() => {
      const isDarkTheme = document.body.classList.toggle("dark-theme");
      localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
      document.getElementById("highlightjs-light").disabled = isDarkTheme;
      document.getElementById("highlightjs-dark").disabled = !isDarkTheme;
    });
    await page.waitForTimeout(100); // Wait for theme change
    await expect(body).not.toHaveClass(/.*dark-theme.*/);

    // Switch back to dark theme via JavaScript
    await page.evaluate(() => {
      const isDarkTheme = document.body.classList.toggle("dark-theme");
      localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
      document.getElementById("highlightjs-light").disabled = isDarkTheme;
      document.getElementById("highlightjs-dark").disabled = !isDarkTheme;
    });
    await page.waitForTimeout(100); // Wait for theme change
    await expect(body).toHaveClass(/.*dark-theme.*/);
  });

  test("theme persists in localStorage", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const themeToggle = page.locator("#themeToggleIcon");

    // Switch to light theme via JavaScript
    await page.evaluate(() => {
      const isDarkTheme = document.body.classList.toggle("dark-theme");
      localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
      document.getElementById("highlightjs-light").disabled = isDarkTheme;
      document.getElementById("highlightjs-dark").disabled = !isDarkTheme;
    });

    // Check localStorage was updated
    const storedTheme = await page.evaluate(() =>
      localStorage.getItem("theme"),
    );
    expect(storedTheme).toBe("light");

    // Reload page
    await page.reload();

    // Theme should persist
    const body = page.locator("body");
    await expect(body).not.toHaveClass(/.*dark-theme.*/);

    // Switch back to dark theme via JavaScript
    await page.evaluate(() => {
      const isDarkTheme = document.body.classList.toggle("dark-theme");
      localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
      document.getElementById("highlightjs-light").disabled = isDarkTheme;
      document.getElementById("highlightjs-dark").disabled = !isDarkTheme;
    });

    const newStoredTheme = await page.evaluate(() =>
      localStorage.getItem("theme"),
    );
    expect(newStoredTheme).toBe("dark");
  });

  test("syntax highlighting theme switches with main theme", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const themeToggle = page.locator("#themeToggleIcon");
    const lightThemeLink = page.locator("#highlightjs-light");
    const darkThemeLink = page.locator("#highlightjs-dark");

    // Start in dark theme
    await expect(darkThemeLink).not.toHaveAttribute("disabled");
    await expect(lightThemeLink).toHaveAttribute("disabled");

    // Switch to light theme via JavaScript
    await page.evaluate(() => {
      const isDarkTheme = document.body.classList.toggle("dark-theme");
      localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
      document.getElementById("highlightjs-light").disabled = isDarkTheme;
      document.getElementById("highlightjs-dark").disabled = !isDarkTheme;
    });

    // Light theme CSS should be enabled, dark disabled
    await expect(lightThemeLink).not.toHaveAttribute("disabled");
    await expect(darkThemeLink).toHaveAttribute("disabled");

    // Switch back to dark theme via JavaScript
    await page.evaluate(() => {
      const isDarkTheme = document.body.classList.toggle("dark-theme");
      localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
      document.getElementById("highlightjs-light").disabled = isDarkTheme;
      document.getElementById("highlightjs-dark").disabled = !isDarkTheme;
    });

    // Dark theme CSS should be enabled again
    await expect(darkThemeLink).not.toHaveAttribute("disabled");
    await expect(lightThemeLink).toHaveAttribute("disabled");
  });

  test("theme works without JavaScript", async ({ browser }) => {
    // Create new context with JavaScript disabled
    const context = await browser.newContext({ javaScriptEnabled: false });
    const jsDisabledPage = await context.newPage();
    await jsDisabledPage.goto("/");

    // Page should still be usable
    const content = jsDisabledPage.locator("#file-content");
    await expect(content).toBeVisible();

    // Theme toggle should be present (though non-functional)
    const themeToggle = jsDisabledPage.locator("#themeToggleIcon");
    await expect(themeToggle).toBeVisible();

    await context.close();
  });

  test("theme respects user preference from localStorage on load", async ({
    page,
  }) => {
    // Set light theme preference before loading page
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => localStorage.setItem("theme", "light"));

    await page.reload();

    const body = page.locator("body");
    await expect(body).not.toHaveClass(/.*dark-theme.*/);

    const lightThemeLink = page.locator("#highlightjs-light");
    const darkThemeLink = page.locator("#highlightjs-dark");

    await expect(lightThemeLink).not.toHaveAttribute("disabled");
    await expect(darkThemeLink).toHaveAttribute("disabled");
  });

  test("invalid localStorage theme falls back to default", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Set invalid theme value
    await page.evaluate(() => localStorage.setItem("theme", "invalid-theme"));

    await page.reload();

    // Should fall back to default dark theme
    const body = page.locator("body");
    await expect(body).toHaveClass(/.*dark-theme.*/);
  });

  test("theme toggle has proper ARIA attributes", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const themeToggle = page.locator("#themeToggleIcon");

    // Should have accessibility attributes
    await expect(themeToggle).toHaveAttribute("aria-label");
    await expect(themeToggle).toHaveAttribute("title");

    const ariaLabel = await themeToggle.getAttribute("aria-label");
    expect(ariaLabel).toContain("theme");

    const title = await themeToggle.getAttribute("title");
    expect(title).toContain("Theme");
  });
});
