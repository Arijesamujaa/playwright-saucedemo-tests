import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly itemPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
  }

  // productId example: 'sauce-labs-backpack'
  async addToCart(productId: string) {
    await this.page.locator(`[data-test="add-to-cart-${productId}"]`).click();
  }

  async removeFromCart(productId: string) {
    await this.page.locator(`[data-test="remove-${productId}"]`).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}