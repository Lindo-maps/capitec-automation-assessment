const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/login.page');

test('standard_user can log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    //await expect(page.getByText('Swag Labs')).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('locked_out_user sees an error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    //await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});