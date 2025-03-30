import { test, expect } from '@playwright/test';
import { CableGuyPage } from '../pages/cableGuy';
import { BasketPage } from '../pages/basketPage';
import { ProductPage } from '../pages/productPage';

test.describe('CableGuy Test Scenario', () => {
    let cableGuyPage: CableGuyPage;
    let basketPage: BasketPage;
    let productPage: ProductPage;

    test.beforeEach(async ({ page }) => {
        cableGuyPage = new CableGuyPage(page);
        basketPage = new BasketPage(page);
        productPage = new ProductPage(page);
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



        // Some manufacturers have no products (Check tests/failed-tests-screenshots/failed-test.png)
        // Expect this test to fail during some executions
        await productPage.validateProductCount(selectedManufacturer);

        // Step 4: Open random product and Verify the correct page has opened

        //const selectedProduct = await cableGuyPage.openRandomProduct();
        await productPage.chooseProductVerifyPage();

        // Step 5: Add to basket and verify popup
        const productName = await basketPage.addToBasket();
        await basketPage.verifyBasketPopup(productName);
    });
});