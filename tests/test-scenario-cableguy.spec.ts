import { test, expect } from '@playwright/test';
import { CableGuyPage } from '../pages/cableGuy';

test.describe('CableGuy Test Scenario', () => {
    let cableGuyPage: CableGuyPage;

    test.beforeEach(async ({ page }) => {
        cableGuyPage = new CableGuyPage(page);
        await page.goto('https://www.thomann.de/intl/cableguy.html');
        const consentCookiesBtn = await page.locator('button.js-accept-all-cookies');
        await consentCookiesBtn.click();
    });

    test('Complete CableGuy workflow', async ({ page }) => {
        // Step 1: Select random Cable Beginning
        await cableGuyPage.selectRandomCableBeginning();

        // Step 2: Select random Cable End
        await cableGuyPage.selectRandomCableEnd();


        // Step 3: Select manufacturer and validate product count
        const selectedManufacturer = await cableGuyPage.selectRandomManufacturer();

        // Some manufacturers have no products (Check failed tests screenshots)
        // Expect this test to fail during some executions
        await cableGuyPage.validateProductCount(selectedManufacturer);

        // Step 4: Open random product

        //const selectedProduct = await cableGuyPage.openRandomProduct();
        await cableGuyPage.verifyProductPage();

        // // Step 5: Add to basket and verify popup
        // await cableGuyPage.addToBasket();
        // await cableGuyPage.verifyBasketPopup();
    });
});