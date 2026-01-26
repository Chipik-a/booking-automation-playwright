import {BasePage} from "./base.page.ts";
import {expect, Locator, Page} from "@playwright/test";
import {UI_CONFIG} from "@helpers/uiConfig.js";
import {AdminRoomsPage} from "@pages/adminRooms.page.js";

export class AdminPage extends BasePage {
    readonly cardHeader: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.cardHeader = page.locator('.card-header');
        this.emailInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#doLogin');
        // this.roomHeader = page.locator('div.rowHeader >> text="Room #"');
        this.errorMessage = page.locator('.alert');
    }

    async waitForLoginPage() {
        await expect(this.cardHeader).toBeVisible();
    }

    async fillCredentials(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async clickLogin(){
        await this.loginButton.click();
    }

    async waitForErrorMessage() {
     await expect(this.errorMessage).toBeVisible();
    }


    async login(email: string, password: string) {
        await this.fillCredentials(email, password);
        await this.clickLogin();

        const adminRoomsPage = new AdminRoomsPage(this.page);
        await adminRoomsPage.waitForPage();
    }

    async loginExpectingError(email: string, password: string) {
        await this.fillCredentials(email, password);
        await this.clickLogin();
        await this.waitForErrorMessage();
    }

    async waitForRedirectToLogin() {
        await expect(this.cardHeader).toBeVisible();
        await expect(this.page).not.toHaveURL(UI_CONFIG.routes.adminRooms);
    }

}