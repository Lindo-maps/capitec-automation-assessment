const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/login.page');
const userData = require('../../testdata/users.json');

test('standard_user can log in successfully', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login(
    userData.standard.username,
    userData.standard.password
    );
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('locked_out_user sees an error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login( userData.lockedOut.username,
    userData.lockedOut.password);
    await expect(page.locator('[data-test="error"]'))
    .toContainText('Sorry, this user has been locked out');
});