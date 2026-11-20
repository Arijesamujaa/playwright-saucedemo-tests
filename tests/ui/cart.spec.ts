import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Cart', () => {
  let inventory: InventoryPage;
  let cart: CartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventory = new InventoryPage(page);
    cart = new CartPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(inventory.title).toHaveText('Products');
  });

  test('adding one item shows 1 in the cart badge', async () => {
    await inventory.addToCart('sauce-labs-backpack');
    await expect(inventory.cartBadge).toHaveText('1');
  });

  test('adding two items shows 2 in the cart badge', async () => {
    await inventory.addToCart('sauce-labs-backpack');
    await inventory.addToCart('sauce-labs-bike-light');
    await expect(inventory.cartBadge).toHaveText('2');
  });

  test('removing an item updates the cart badge', async () => {
    await inventory.addToCart('sauce-labs-backpack');
    await inventory.addToCart('sauce-labs-bike-light');
    await inventory.removeFromCart('sauce-labs-backpack');
    await expect(inventory.cartBadge).toHaveText('1');
  });

  test('cart page lists the added item', async () => {
    await inventory.addToCart('sauce-labs-backpack');
    await inventory.openCart();
    await expect(cart.items).toHaveCount(1);
    await expect(cart.itemNames).toHaveText('Sauce Labs Backpack');
  });
});