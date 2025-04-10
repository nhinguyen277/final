const { test, expect } = require("@playwright/test");
const { Console } = require("console");

test("Login using standard user", async ({ page }) => {
  console.log("Navigating to website...");
  await page.goto("https://www.saucedemo.com/");
  console.log("Fill username with standard_user");
  await page.fill("#user-name", "standard_user");
  console.log("Fill password");
  await page.fill('input[type="password"]', "secret_sauce");
  console.log("Click submit");
  await page.click('input[type="submit"]');

  console.log("Successfully login. Navigate to inventory page");
  await page
    .waitForURL("**/inventory.html", { timeout: 10000 })
    .catch(() => {});
  const heading = await page.locator(".title").first();
  await expect(heading).toBeVisible();
});

test("Login using locked_out_user", async ({ page }) => {
  console.log("Navigating to website...");
  await page.goto("https://www.saucedemo.com/");
  console.log("Fill username with locked_out_user");
  await page.fill("#user-name", "locked_out_user");
  console.log("Fill password");
  await page.fill('input[type="password"]', "secret_sauce");
  console.log("Click submit");
  await page.click('input[type="submit"]');

  console.log("Error message");
  await expect(page.locator("h3").first()).toContainText(
    "Epic sadface: Sorry, this user has been locked out."
  );
});

test("View a product using standard user", async ({ page }) => {
  console.log("Navigating to website...");
  await page.goto("https://www.saucedemo.com/");
  console.log("Fill username with standard_user");
  await page.fill("#user-name", "standard_user");
  console.log("Fill password");
  await page.fill('input[type="password"]', "secret_sauce");
  console.log("Click submit");
  await page.click('input[type="submit"]');

  console.log("Successfully login. Navigate to inventory page");
  await page
    .waitForURL("**/inventory.html", { timeout: 10000 })
    .catch(() => {});

  console.log("Click a title of Sauce Labs Backpack to view");
  await page.click(".inventory_item_name");

  console.log("View product information");
  await page
    .waitForURL("**/inventory-item.html?id=4", { timeout: 10000 })
    .catch(() => {});

  const productHeader = await page.locator(
    ".inventory_details_name.large_size"
  );
  await expect(productHeader).toContainText("Sauce Labs Backpack");
});
