import { test, expect } from "@playwright/test";

test.describe("Content Loading & Navigation", () => {
  test("homepage loads and redirects to first content", async ({ page }) => {
    await page.goto("/");

    // Should redirect to a content page
    await expect(page).toHaveURL(/\/content\/.+/);

    // Should have the site title
    await expect(page).toHaveTitle(/.*Home.*|.*My Site.*/);

    // Content should be loaded
    const content = page.locator("#file-content");
    await expect(content).toBeVisible();
  });

  test("markdown content renders correctly", async ({ page }) => {
    await page.goto("/content/Home.md");

    // Should render markdown as HTML
    const h1 = page.locator("#file-content h1");
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("Welcome");

    // Should have markdown-body class for styling
    const content = page.locator("#file-content");
    await expect(content).toHaveClass(/.*markdown-body.*/);
  });

  test("navigation between content works", async ({ page }) => {
    await page.goto("/");

    // Check if on mobile and open sidebar if needed
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width <= 768) {
      const collapseBtn = page.locator("#collapseSidebar");
      await collapseBtn.click();
      await page.waitForTimeout(300);
    }

    // Get all navigation links
    const navLinks = page.locator('.sidebar a[href^="/content/"]');
    const linkCount = await navLinks.count();

    if (linkCount > 1) {
      // Click on a different content link
      const secondLink = navLinks.nth(1);
      const href = await secondLink.getAttribute("href");

      await secondLink.click();

      // Should navigate to new content
      await expect(page).toHaveURL(href);

      // Content should change
      const content = page.locator("#file-content");
      await expect(content).toBeVisible();
    }
  });

  test("download button works for markdown files", async ({ page }) => {
    await page.goto("/content/Home.md");

    // Download button should be present
    const downloadBtn = page.locator(".download-button");
    await expect(downloadBtn).toBeVisible();

    // Should have correct download URL
    await expect(downloadBtn).toHaveAttribute("href", "/download/Home.md");

    // Should have accessibility attributes
    await expect(downloadBtn).toHaveAttribute("title", "Download");
  });

  test("RSS feed is accessible", async ({ page }) => {
    await page.goto("/");

    // RSS button should be present
    const rssBtn = page.locator(".rss-button");
    await expect(rssBtn).toBeVisible();

    // Should link to RSS feed
    await expect(rssBtn).toHaveAttribute("href", "/rss.xml");

    // RSS feed should be accessible
    const response = await page.request.get("/rss.xml");
    expect(response.status()).toBe(200);

    const rssContent = await response.text();
    expect(rssContent).toContain('<?xml version="1.0"');
    expect(rssContent).toContain('version="2.0"');
  });

  test("syntax highlighting works", async ({ page }) => {
    // Go to a page that should have code blocks
    await page.goto("/content/tests/Markdown-it.md");

    // Look for syntax highlighted code
    const codeBlocks = page.locator("pre code");
    if ((await codeBlocks.count()) > 0) {
      // Should have hljs class for syntax highlighting
      const firstCodeBlock = codeBlocks.first();
      const classes = await firstCodeBlock.getAttribute("class");
      expect(classes).toContain("hljs");
    }
  });

  test("copy code button works", async ({ page }) => {
    await page.goto("/content/tests/Markdown-it.md");

    // Wait for copy buttons to be added
    await page.waitForTimeout(500);

    const copyBtns = page.locator(".copy-btn");
    if ((await copyBtns.count()) > 0) {
      const firstCopyBtn = copyBtns.first();
      await expect(firstCopyBtn).toBeVisible();

      // Click should work (button should exist and be clickable)
      await firstCopyBtn.click();

      // Button text should change temporarily
      await expect(firstCopyBtn).toContainText("Copied!");
    }
  });

  test("sidebar has navigation links", async ({ page }) => {
    await page.goto("/");

    // Sidebar should be visible
    const sidebar = page.locator(".sidebar");
    await expect(sidebar).toBeVisible();

    // Should have navigation links
    const navLinks = page.locator('.sidebar a[href^="/content/"]');
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThanOrEqual(1);

    // Links should be visible and have text
    const firstLink = navLinks.first();
    await expect(firstLink).toBeVisible();

    const linkText = await firstLink.textContent();
    expect(linkText.trim().length).toBeGreaterThan(0);
  });

  test("profile image loads when present", async ({ page }) => {
    await page.goto("/");

    // Check if profile image is supposed to be there
    const imgContainer = page.locator(".image-container img");
    const imgCount = await imgContainer.count();

    if (imgCount > 0) {
      await expect(imgContainer).toBeVisible();
      await expect(imgContainer).toHaveAttribute("src", "/profile-pic");
      await expect(imgContainer).toHaveAttribute("alt", "Profile Image");
    }
  });
});
