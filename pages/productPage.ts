import { Page, Locator, expect } from "@playwright/test";

export class ProductPage {
    private readonly page: Page;

    // Locators
    private productItems: Locator;
    private readonly productNames: Locator;

    constructor(page: Page) {
        this.page = page;

        this.productItems = page.locator(".fx-product-list-entry");
        this.productNames = page.locator(".title__manufacturer");
    }

    async countItemsAcrossPages(page: Page): Promise<number> {
        let totalItemCount = 0;

        while (true) {
            // Count items on the current page
            const items = await this.productItems.count();
            totalItemCount += items;


            const nextButton = page.locator('button:has(svg.cg-icons__arrow--right)');

            // Check if the button is visible
            await page.waitForTimeout(3000);
            if (!(await nextButton.isVisible())) break; // Stop if button is hidden

            // Click "Next" and wait for the page to load
            await nextButton.click();
            await page.waitForLoadState('domcontentloaded');
        }

        return totalItemCount;
    }
    async validateProductCount(selectedOption: Locator) {
        const countLabel = selectedOption.locator('.cg-brands__item__count');
        const expectedCount = parseInt((await countLabel.innerText()).match(/\d+/)?.[0] || '0');

        await this.page.waitForTimeout(3000);
        const actualItemCount = await this.countItemsAcrossPages(this.page);
        expect(actualItemCount).toBe(expectedCount);
    }

    async chooseProductVerifyPage() {

        const products = await this.productNames.all();
        const randomProduct = products[Math.floor(Math.random() * products.length)];

        const productName = await randomProduct.innerText();
        const productNameComparable = productName ? productName.trim().toLowerCase() : '';
        const expectedString = productNameComparable
            .replace(/\s+/g, '_');

        await Promise.all([
            this.page.waitForURL('**/*', { waitUntil: 'load' }), // Listen for the new page
            randomProduct.click() // The action that triggers a new page
        ]);

        // Check that the new page url contains the name of the chosen product
        await expect(
            this.page.url().toLowerCase()
        ).toMatch(new RegExp(expectedString, 'i'));


    }
}