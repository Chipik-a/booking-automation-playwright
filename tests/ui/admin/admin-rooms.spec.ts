import {test} from "@playwright/test";
import {openAdminLogin} from "@helpers/openAdminLogin.js";
import {credentials} from "@config/credentials.js";
import {AdminRoomsPage} from "@pages/adminRooms.page.js";

test.describe('Admin Roots - smoke', () => {
    test('UI: should open rooms page after successful login', async ({page}) => {
        const { adminPage } = await openAdminLogin(page);

        await adminPage.login(credentials.valid.username, credentials.valid.password);

        const adminRoomsPage = new AdminRoomsPage(page);
        await adminRoomsPage.waitForPage();
    });


});

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