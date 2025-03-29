import { Page, Locator, expect } from "@playwright/test";

export class CableGuyPage {
    private readonly page: Page;

    // Locators
    private readonly cableBeginningBtn: Locator;
    private readonly cableEndBtn: Locator;
    private readonly cableTypeOptions: Locator;
    private readonly activeCableTypeOptions: Locator;
    private readonly cableOption: Locator;
    private readonly manufacturerOptions: Locator;
    private readonly productCountLabel: Locator;
    private readonly productItems: Locator;
    private readonly productNames: Locator;
    private readonly productOverview: Locator;
    private readonly addToBasketBtn: Locator;
    private readonly basketPopup: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators

        // Cable beginning button
        this.cableBeginningBtn = page.locator(
            'button.cg-plugButton--left:has-text("cable beginning")',
        );
        // Cable end button, better for accessibility options
        this.cableEndBtn = page.locator(
            'button.cg-plugButton--right:has-text("cable end")',
        );
        this.cableTypeOptions = page.locator(".cg-plugmodal__category__item");

        // Shows only active types - prevents invalid cable end selections
        this.activeCableTypeOptions = this.cableTypeOptions.filter({
            hasNot: this.page.locator('.inactive')
        });
        this.cableOption = page.locator(".cg-plugItem");
        this.manufacturerOptions = page.locator(".cg-brands__item");
        this.productCountLabel = page.locator(".cg-brands__item__count");
        this.productItems = page.locator(".fx-product-list-entry");
        this.productNames = page.locator(".title__manufacturer");
        this.productOverview = page.locator(".fx-content-product .fx-product-orderable");
        this.addToBasketBtn = page.getByRole('button', { name: 'Add to Basket' });
        this.basketPopup = page.locator(".basket-notification");
    }

    // Select a random cable beginning
    async selectRandomCableBeginning() {
        await this.cableBeginningBtn.click();
        const options = await this.cableTypeOptions.all();
        const randomOption = options[Math.floor(Math.random() * options.length)];
        await randomOption.click();

        const cables = await this.cableOption.all();
        const randomCable = cables[Math.floor(Math.random() * cables.length)];
        await randomCable.click();
    }

    // Select a random cable End
    async selectRandomCableEnd() {
        await this.cableEndBtn.click();
        const options = await this.activeCableTypeOptions.all();
        const randomOption = options[Math.floor(Math.random() * options.length)];
        await randomOption.click();

        const cables = await this.cableOption.all();
        const randomCable = cables[Math.floor(Math.random() * cables.length)];
        await randomCable.click();
    }

    // Select a random manufacturer
    async selectRandomManufacturer() {
        const options = await this.manufacturerOptions.all();
        const randomOption = options[Math.floor(Math.random() * options.length)];
        await randomOption.click();

        return randomOption;
    }

    // Validate the product count of the previously selected manufacturer
    async validateProductCount(selectedOption: any) {
        const countLabel = selectedOption.locator('+ .cg-brands__item__count');
        const countText = await countLabel.innerText();
        const expectedCount = parseInt(countText?.match(/\d+/)![0] || '0');
        const actualCount = await this.productItems.count();
        expect(actualCount).toBe(expectedCount);
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

        // // Check for the product overview in the new page
        // await expect(this.productOverview).toBeVisible();
    }

    async addToBasket() {
        await expect(this.addToBasketBtn).toBeVisible();
        await this.addToBasketBtn.click();
    }

    // async verifyBasketPopup() {
    //     await expect(this.basketPopup).toBeVisible();
    //     await expect(this.basketPopup).toContainText('Item added to basket');
    // }
}
