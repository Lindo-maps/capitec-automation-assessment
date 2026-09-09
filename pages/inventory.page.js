class InventoryPage {
    constructor(page) {
        this.page = page;
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartIcon = page.locator('.shopping_cart_link');
    }

    async addItemToCart(noItems) {
        await this.page.locator(`[data-test="add-to-cart-${noItems}"]`).click();
    }

    async removeItemFromCart(noItems) {
        await this.page.locator(`[data-test="remove-${item}"]`).click();
    }

    async goToCart() {
        await this.cartIcon.click();
    }
}

module.exports = { InventoryPage };