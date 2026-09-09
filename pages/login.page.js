class LoginPage {
    constructor(page) {
        this.userInput = page.getByPlaceholder('Username');
        this.userPassword = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async login(username, password) {
        await this.userInput.fill(username);
        await this.userPassword.fill(password);
        await this.loginButton.click();
    }
}

module.exports = { LoginPage };