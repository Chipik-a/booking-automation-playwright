import {test} from "@playwright/test";
import {openAdminLogin} from "@helpers/openAdminLogin.js";
import {credentials} from "@config/credentials.js";
import {AdminRoomsPage} from "@pages/adminRooms.page.js";
import {AdminPage} from "@pages/admin.page.js";
import {invalidRoom, validRoom} from "../../../data/roomsData.js";

test.describe('Admin Rooms - Smoke Tests', () => {
    let adminPage: AdminPage;
    let adminRoomsPage: AdminRoomsPage;

    test.beforeEach(async ({ page }) => {
        ({ adminPage } = await openAdminLogin(page));
        await adminPage.login(credentials.valid.username, credentials.valid.password);
        adminRoomsPage = new AdminRoomsPage(page);
        await adminRoomsPage.waitForPage();
    });


// === VALID DATA TESTS ===
test.describe('Valid credentials', () => {

    test('UI: should open rooms page after successful login', async () => {
//checked page
    });

    test('e2e: should create a new room with required fields only', async () => {
        await adminRoomsPage.fillRoomForm(validRoom); //fill form
        await adminRoomsPage.createRoom(); //create booking
        await adminRoomsPage.waitForRoomList(validRoom.number); //check that the booking has been created.
    });
});


// === INVALID DATA TESTS ===
        test.describe('Admin Rooms - Invalid data - SmokeTest', () => {
            invalidRoom.forEach((room, index) => {
                test(`e2e: should not create room without required fields - case ${index + 1}`, async () => {

                    await adminRoomsPage.fillRoomForm(room);
                    await adminRoomsPage.createRoom();
                    await adminRoomsPage.expectValidationError();
                    await adminRoomsPage.expectRoomNotCreated();
                })
            })
        })
})

    //test('e2e: should create room with amenities', ...)

    //price more than 1000


/*
test('should open rooms page after login', ...)
test('should create a new room', ...)
форма заполняется
комната появляется в списке
данные корректны
test('should not allow creating room without required fields', ...)
пустой price
пустой room number
неверный формат
test('should update room details', ...)
test('should delete a room', ...)

 */