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
    private productItems: Locator;


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
        this.manufacturerOptions = page.locator('.cg-brands .scroll .boundary .wrapper .items');
        this.productItems = page.locator(".fx-product-list-entry");

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
        const options = await this.manufacturerOptions.locator('.item').all();
        const randomOption = options.at(Math.floor(Math.random() * options.length));

        //await randomOption.waitFor({ state: 'visible' });
        if (randomOption) {
            console.log('Random option:', randomOption.innerText());
            await randomOption.click();
        } else {
            throw new Error('Random option is undefined');
        }

        await this.page.waitForTimeout(2000);
        this.productItems = this.page.locator(".fx-product-list-entry");

        return randomOption;
    }


}
