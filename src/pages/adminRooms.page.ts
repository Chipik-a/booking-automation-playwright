import {BasePage} from "@pages/base.page.js";
import {expect, Locator, Page} from "@playwright/test";

export class AdminRoomsPage extends BasePage {
    readonly roomHeader: Locator;

    constructor(page: Page ) {
        super(page);
        this.roomHeader = page.locator('div.rowHeader >> text="Room #"');
    }

    async waitForPage() {
        await expect(this.roomHeader).toBeVisible();
    }
}