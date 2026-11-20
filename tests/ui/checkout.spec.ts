import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout', () => {
  let inventory: InventoryPage;
  let cart: CartPage;
  let checkout: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventory = new InventoryPage(page);
    cart = new CartPage(page);
    checkout = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventory.addToCart('sauce-labs-backpack');
    await inventory.openCart();
    await cart.checkoutButton.click();
  });

  test('user can complete an order', async () => {
    await checkout.fillDetails('Arijesa', 'Muja', '10000');
    await checkout.finishButton.click();
    await expect(checkout.confirmation).toHaveText('Thank you for your order!');
  });

  test('missing first name shows an error', async () => {
    await checkout.fillDetails('', 'Muja', '10000');
    await expect(checkout.error).toContainText('First Name is required');
  });

  test('missing postal code shows an error', async () => {
    await checkout.fillDetails('Arijesa', 'Muja', '');
    await expect(checkout.error).toContainText('Postal Code is required');
  });
});