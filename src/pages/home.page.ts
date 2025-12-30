import {BasePage} from "./base.page.ts";
import {expect} from "@playwright/test";
import {UI_CONFIG} from "@helpers/uiConfig.ts";
import {AdminPage} from "./admin.page.ts";

export class HomePage extends BasePage {
    readonly adminButton = this.page.getByRole('link', {name: 'Admin', exact: true});
    readonly uniqueElement = this.page.getByRole('heading', {level: 1});

    async open() {
        await this.page.goto(UI_CONFIG.routes.home);
        await expect(this.uniqueElement).toBeVisible();
    }

    async goToAdmin(): Promise<AdminPage> {
        await this.adminButton.click();
        return new AdminPage(this.page);
    }
}