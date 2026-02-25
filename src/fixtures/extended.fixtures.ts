import {test as base, Page, expect} from "@playwright/test";
import {AdminPage} from "@pages/admin.page.ts";
import {credentials} from "@helpers/credentials.ts";
import {UI_CONFIG} from "@helpers/uiConfig.ts";
import {AdminRoomsPage} from "@pages/adminRooms.page.ts";

type ExtendedFixtures = {
    page: Page;
    adminPage: AdminPage;
    createdRooms: number[];
    roomCounter: { getNext: () => number };
};

export const test = base.extend<ExtendedFixtures>({
    page: async ({browser}, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(`${UI_CONFIG.baseURL}${UI_CONFIG.routes.admin}`);
        await use(page);
        await context.close();
    },

    adminPage: async ({page}, use) => {
        const adminPage = new AdminPage(page);
        await adminPage.waitForLoginPage();
        await adminPage.login(credentials.valid.username, credentials.valid.password);
        await use(adminPage);
    },

    createdRooms: async ({ page }, use) => {
        const rooms: number[] = [];
        await use(rooms);

        //UI cleanup
       if (rooms.length === 0) return;

       const adminRoomsPage = new AdminRoomsPage(page);

       page.on('dialog', (dialog) => dialog.accept());

        for (const roomNumber of rooms) {
            const row = adminRoomsPage.getRoomRow(roomNumber);
            //// Если строки нет — пропускаем

            if (await row.count() === 0) {
                console.log('Room not found:', roomNumber);
                continue;
            }

            // Ждём, пока строка и кнопка видимы
            await expect(row).toBeVisible();
            const deleteBtn = adminRoomsPage.getDeleteBtn(roomNumber);
            await expect(deleteBtn).toBeVisible();

            // Кликаем по кнопке удаления
            await deleteBtn.click();

            // Ждём, пока строка исчезнет
            await expect(row).toHaveCount(0);

            console.log('Deleted room:', roomNumber);
        }
    },

    roomCounter: async ({}, use) => {
        await use({
            getNext: () => Date.now() % 100000
        });
    }
});
