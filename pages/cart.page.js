class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }
}

module.exports = { CartPage };