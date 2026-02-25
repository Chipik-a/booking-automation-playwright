import {BasePage} from "@pages/base.page.js";
import {expect, Locator, Page} from "@playwright/test";
import {Amenities} from "@helpers/types.ts";


export class AdminRoomsPage extends BasePage {
    readonly roomHeader: Locator;
    readonly btnCreateRoom: Locator;
    readonly inputRoomNumber: Locator;
    readonly selectType: Locator;
    readonly selectAccessible: Locator;
    readonly inputPrice: Locator;
    readonly alertDanger: Locator;
   // readonly deleteRoom: Locator;

    private amenitiesMap: Record<keyof Amenities, Locator>;

    constructor(page: Page) {
        super(page);
        this.roomHeader = page.locator('div.rowHeader >> text="Room #"');
        this.btnCreateRoom = page.locator('#createRoom');
        this.inputRoomNumber = page.locator('#roomName');
        this.selectType = page.locator('#type');
        this.selectAccessible = page.locator('#accessible');
        this.inputPrice = page.locator('#roomPrice');

        this.amenitiesMap = {
            wifi: page.locator('#wifiCheckbox'),
            tv: page.locator('#tvCheckbox'),
            radio: page.locator('#radioCheckbox'),
            refreshments: page.locator('#refreshCheckbox'),
            safe: page.locator('#safeCheckbox'),
            views: page.locator('#viewsCheckbox'),
        }
        this.alertDanger = page.locator('.alert-danger');
        //this.deleteRoom = page.locator('.roomDelete');
    }

    // Находим карточку комнаты по номеру
    getRoomCard(roomNumber: number) {
        return this.page.locator(`div[data-testid="roomlisting"]`, { has: this.page.locator(`p`, { hasText: roomNumber.toString() }) });
    }


    getRoomRow(roomNumber: number) {
        //return this.page.locator('tr', { has: this.page.locator('td', { hasText: roomNumber.toString() }) });
        return this.page.locator(`#roomName${roomNumber}`).first().locator('..');
    }

    // Находим кнопку удаления именно этой комнаты
    getDeleteBtn(roomNumber: number) {
        //return this.getRoomRow(roomNumber).locator('.roomDelete');
        return this.getRoomCard(roomNumber).locator('.roomDelete');
    }

    async waitForPage() {
        await expect(this.roomHeader).toBeVisible();
    }

    async createRoom() {
        await this.btnCreateRoom.click();
    }

    async fillRoomForm(data: {
        number?: number;
        type?: string;
        accessible?: boolean;
        price?: number;
        amenities?: Amenities;
    }) {
        if (data.number !== undefined) {
            await this.inputRoomNumber.fill(String(data.number));
        }

        if (data.type) {
            await this.selectType.waitFor({state: 'visible'});
            //await this.selectType.waitFor({ state: 'enabled' });
            await this.selectType.selectOption({value: data.type});
        }

        if (data.accessible !== undefined) {
            const value = data.accessible ? 'true' : 'false';
            await this.selectAccessible.selectOption({value});
        }

        if (data.price !== undefined) {
            await this.inputPrice.fill(String(data.price));
        }

        if (data.amenities) {
            for (const [key, value] of Object.entries(data.amenities)) {
                if (value) {
                    await this.amenitiesMap[key as keyof Amenities].check();
                } else {
                    await this.amenitiesMap[key as keyof Amenities].uncheck();
                }
            }
        }
    };

    async waitForRoomList(roomNumber: number) {
        const card = this.getRoomCard(roomNumber);
        await expect(card).toBeVisible();
    }


    async expectValidationError() {
        await expect(this.alertDanger).toBeVisible();
    }

    async expectRoomNotCreated(roomNumber?: number) {
        if (roomNumber === undefined) return;
        const card = this.getRoomCard(roomNumber); // снова используем метод
        await expect(card).toHaveCount(0);
    }

    async deleteRoomByNumber(roomNumber: number) {
        const deleteBtn = this.getDeleteBtn(roomNumber);
        if( await deleteBtn.count() > 0) {
            await deleteBtn.click();

            const card = this.getRoomCard(roomNumber);
            await expect(card).toHaveCount(0);
        }
    }
}
