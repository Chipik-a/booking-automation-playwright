import { Page } from "@playwright/test";
import { AdminPage } from "@pages/admin.page.js";
import { HomePage } from "@pages/home.page.js";

export async function openAdminLogin(page: Page) {
    const homePage = new HomePage(page);
    const adminPage = new AdminPage(page);

    await homePage.open();
    await homePage.goToAdmin();

    return { homePage, adminPage };
}