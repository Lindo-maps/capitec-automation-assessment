const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/login.page');
const userData = require('../../testdata/users.json');
const { InventoryPage } = require('../../pages/inventory.page');
const { CartPage } = require('../../pages/cart.page');
const { CheckoutPage } = require('../../pages/checkout.page');

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login(userData.standard.username,userData.standard.password);
});

test('adding an item updates the cart badge', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
});

test('removing an item empties the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.removeItemFromCart('sauce-labs-backpack');
    await expect(inventoryPage.cartBadge).toHaveCount(0);
});

test('user can complete checkout end to end', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await inventoryPage.goToCart();
    await cartPage.goToCheckout();
    await checkoutPage.fillInfo(
    userData.checkoutCustomer.firstName,
    userData.checkoutCustomer.lastName,
    userData.checkoutCustomer.postalCode
    );
    await checkoutPage.finishOrder();

    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
});