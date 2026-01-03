import {test} from "@playwright/test";
//import { HomePage } from "@pages/home.page.ts";
import {AdminPage} from "@pages/admin.page.ts";
import {credentials} from "@config/credentials.js";
//import {UI_CONFIG} from "@helpers/uiConfig.js";
import {openAdminLogin} from "@helpers/openAdminLogin.js";

test.describe("Admin Login - positive scenarios", () => {
    //let homePage: HomePage;
    let adminPage: AdminPage;

    test.beforeEach(async ({ page }) => {
        ({ adminPage} = await openAdminLogin(page));
    });

    test('UI: should open login page', async () => {
        await adminPage.waitForLoginPage();
    })

    test('UI: should login successfully with valid credentials', async () => {
        //await homePage.goToAdmin();
        await adminPage.login(credentials.valid.username, credentials.valid.password);
    });
});

test.describe('Admin Login page - negative scenarios', () => {
    let adminPage: AdminPage;

    test.beforeEach(async ({ page }) => {
        ({ adminPage} = await openAdminLogin(page));
    });

    credentials.invalid.forEach(({ username, password, description }) => {
        test(`UI: should show error when ${description}`, async () => {
            await adminPage.loginExpectingError(username, password);
        })
    })
})



