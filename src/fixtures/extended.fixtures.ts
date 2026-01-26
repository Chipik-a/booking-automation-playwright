import {test as base, Page} from "@playwright/test";
import {AdminPage} from "@pages/admin.page.ts";
import {credentials} from "@helpers/credentials.ts";
import {UI_CONFIG} from "@helpers/uiConfig.ts";
//import {AdminRoomsPage} from "@pages/adminRooms.page.ts";

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

    // createdRooms: async ({ page }, use) => {
    //     const rooms: number[] = [];
    //     await use(rooms);
    //
    //     //UI cleanup
    // //     const adminRoomsPage = new AdminRoomsPage(page);
    // //
    // //     page.once('dialog', d => d.accept());
    // //
    // //     for (const roomNumber of rooms) {
    // //         const roomRow = adminRoomsPage.getRoomRow(roomNumber);
    // //         if(await roomRow.count() > 0) {
    // //             const deleteBtn = adminRoomsPage.getDeleteBtn(roomNumber);
    // //             await expect(deleteBtn).toBeVisible();
    // //             await deleteBtn.scrollIntoViewIfNeeded();
    // //             await deleteBtn.click();
    // //             await expect(roomRow).toHaveCount(0);
    // //             console.log('Deleting room:', roomNumber);
    // //             // await adminRoomsPage.deleteRoomByNumber(roomNumber);
    // //
    // //             //await expect(roomRow).toHaveCount(0);
    // //         } else {
    // //             console.log('Room not found or already deleted:', roomNumber);
    // //         }
    // //
    // //     }
    //  },
    //
    // roomCounter: async ({}, use) => {
    //     await use({
    //         getNext: () => Date.now() % 100000
    //     });
    // }
});
