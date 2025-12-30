import {test} from "@playwright/test";
import {UI_CONFIG} from "@helpers/uiConfig.js";
import {AdminPage} from "@pages/admin.page.js";

test.describe('Admin access control', () => {
    test('UI: should not allow access to admin rooms without login', async ({page}) => {
        await page.goto(UI_CONFIG.routes.adminRooms);

        const adminPage = new AdminPage(page);
        await adminPage.waitForRedirectToLogin();
    })
});