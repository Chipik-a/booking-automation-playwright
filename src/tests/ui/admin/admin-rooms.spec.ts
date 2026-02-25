import { test } from '@fixtures/extended.fixtures.ts';
import {openAdminLogin} from "@helpers/openAdminLogin.ts";
import {credentials} from "@helpers/credentials.ts";
import {AdminRoomsPage} from "@pages/adminRooms.page.ts";
import {AdminPage} from "@pages/admin.page.js";
import {invalidRoom, validRoomRequiredOnly, validRoomWithAmenities} from "@data/roomsData.ts";
import {UI_CONFIG} from "@helpers/uiConfig.js";
import { expect } from '@playwright/test';

test.describe('Admin Rooms - Smoke Tests', () => {
    let adminPage: AdminPage;
    let adminRoomsPage: AdminRoomsPage;

    test.beforeEach(async ({ page }) => {
        ({ adminPage } = await openAdminLogin(page));
        await adminPage.login(credentials.valid.username, credentials.valid.password);
        await page.goto(`${UI_CONFIG.baseURL}${UI_CONFIG.routes.adminRooms}`);
        adminRoomsPage = new AdminRoomsPage(page);
        await adminRoomsPage.waitForPage();
    });

// === VALID DATA TESTS ===
test.describe('Valid credentials', () => {

    test('UI: should open rooms page after successful login', async () => {
//checked page
    });

    test('UI: should create a new room with required fields only', async (
        {createdRooms, roomCounter}
    ) => {
        const roomNumber = roomCounter.getNext();
        const roomData = {
            ...validRoomRequiredOnly,
            number: roomNumber,
        };

        await adminRoomsPage.fillRoomForm(roomData);
        await adminRoomsPage.createRoom();
        await adminRoomsPage.waitForRoomList(roomNumber);

        await expect(
            adminRoomsPage.getRoomRow(roomNumber)
        ).toBeVisible();

        createdRooms.push(roomNumber);
    });

})
    // test('e2e: should create room with amenities', async ({ roomsApi, createdRooms, roomCounter }) => {
    //
    //     const roomNumber = roomCounter.getNext();
    //     const roomData = {
    //         ...validRoomRequiredOnly,
    //         number: roomNumber,
    //     };
    //
    //     await adminRoomsPage.fillRoomForm(roomData);
    //     await adminRoomsPage.createRoom();
    //     await adminRoomsPage.waitForRoomList(roomNumber);
    //
    //     const roomId = await getCreateRoomId(roomsApi, roomNumber);
    //     createdRooms.push(roomId);
    // });

//     test('UI: should delete a room', async ({ createdRooms }) => {
//         if (createdRooms.length === 0) {
//             const roomNumber = Math.floor(Math.random() * 10000);
//             await adminRoomsPage.fillRoomForm({ ...validRoomRequiredOnly, number: roomNumber });
//             await adminRoomsPage.createRoom();
//             await adminRoomsPage.waitForRoomList(roomNumber);
//             createdRooms.push(roomNumber);
//         }
//
//         const roomNumberToDelete = createdRooms.pop()!;
//         await adminRoomsPage.deleteRoomByNumber(roomNumberToDelete);
//         await adminRoomsPage.expectRoomNotCreated(roomNumberToDelete);
//     });
// });

// === INVALID DATA TESTS ===
//         test.describe('Admin Rooms - Invalid data', () => {
//             invalidRoom.forEach((room, index) => {
//                 test(`e2e: should not create room without required fields - case ${index + 1}`, async ({ roomCounter }) => {
//                     const roomNumber = roomCounter.getNext();
//
//
//                     await adminRoomsPage.fillRoomForm({
//                         ...room,
//                         number: roomNumber
//                     });
//                     await adminRoomsPage.createRoom();
//                     await adminRoomsPage.expectValidationError();
//                     await adminRoomsPage.expectRoomNotCreated(roomNumber);
//                 })
//             })
//         })
})

