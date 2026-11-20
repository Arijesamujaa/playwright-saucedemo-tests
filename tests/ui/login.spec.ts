import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('valid user can log in', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('wrong password shows an error', async () => {
    await loginPage.login('standard_user', 'wrong_password');
    await expect(loginPage.error).toContainText('do not match');
  });

  test('locked out user cannot log in', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.error).toContainText('locked out');
  });

  test('empty username shows an error', async () => {
    await loginPage.login('', 'secret_sauce');
    await expect(loginPage.error).toContainText('Username is required');
  });
});