import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test('products can be sorted by price low to high', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventory.sortDropdown.selectOption('lohi');

  const priceTexts = await inventory.itemPrices.allTextContents();
  const prices = priceTexts.map((p) => parseFloat(p.replace('$', '')));
  const sorted = [...prices].sort((a, b) => a - b);

  expect(prices).toEqual(sorted);
});