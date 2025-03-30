import { Page, Locator, expect } from "@playwright/test";

export class BasketPage {
    private readonly page: Page;

    // Locators
    private readonly addToBasketBtn: Locator;
    private readonly basketPopup: Locator;

    constructor(page: Page) {
        this.page = page;

        this.addToBasketBtn = page.getByRole('button', { name: 'Add to Basket' });
        this.basketPopup = page.locator('#notifications-display');
    }

    async addToBasket() {
        const productPageName = await this.page.locator('h1').textContent();
        await expect(this.addToBasketBtn).toBeVisible();
        await this.addToBasketBtn.click();

        return productPageName;
    }

    async verifyBasketPopup(productPageName: any) {
        await expect(this.basketPopup).toBeVisible();
        // Check the text of the popup
        const expectedText = `${productPageName} is now in the shopping basket.`;
        await expect(this.basketPopup)
            .toContainText(expectedText);
    }
}