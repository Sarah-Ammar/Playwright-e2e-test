import { Page, Locator, expect } from "@playwright/test";

export class CableGuyPage {
    private readonly page: Page;

    // Locators
    private readonly cableBeginningBtn: Locator;
    private readonly cableEndBtn: Locator;
    private readonly cableTypeOptions: Locator;
    private readonly cableOption: Locator;
    private readonly manufacturerOptions: Locator;
    private readonly productCountLabel: Locator;
    private readonly productItems: Locator;
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
        this.cableEndBtn = page.getByRole("button", {
            name: "cable end",
        });
        this.cableTypeOptions = page.locator(".cg-plugmodal__category__item");
        this.cableOption = page.locator(".cg-plugItem");
        this.manufacturerOptions = page.locator(".cg-brands__item");
        this.productCountLabel = page.locator(".cg-brands__item__count");
        this.productItems = page.locator(".fx-product-list-entry");
        this.addToBasketBtn = page.locator("#add-to-basket");
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
        const options = await this.cableTypeOptions.all();
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
    }

    // Validate the product count
    async validateProductCount() {
        const countText = await this.productCountLabel.textContent();
        const expectedCount = parseInt(countText?.match(/\d+/)![0] || '0');
        const actualCount = await this.productItems.count();
        expect(actualCount).toBe(expectedCount);
    }

    // async openRandomProduct() {
    //     const products = await this.productItems.all();
    //     const randomProduct = products[Math.floor(Math.random() * products.length)];
    //     await randomProduct.click();
    // }

    // async verifyProductPage() {
    //     await expect(this.page).toHaveURL(/\/products\/\d+\.html/);
    //     await expect(this.page.locator('#product-title')).toBeVisible();
    // }

    // async addToBasket() {
    //     await this.addToBasketBtn.click();
    // }

    // async verifyBasketPopup() {
    //     await expect(this.basketPopup).toBeVisible();
    //     await expect(this.basketPopup).toContainText('Item added to basket');
    // }
}
