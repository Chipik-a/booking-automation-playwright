import {test, expect} from "@playwright/test";
import {API_CONFIG} from "../../src/helpers/apiClient.ts";

test('API: get all booking IDs', async ({request}) => {
    const response = await request.get(`${API_CONFIG.baseURL}${API_CONFIG.enpoints.booking}`);

        expect(response.status()).toBe(200);
        const body = await response.json();
        console.log("RESPONSE BODY:", body);
        expect(Array.isArray(body)).toBe(true);

        if(body.length > 0) {
            expect(body[0]).toHaveProperty('bookingid');
            expect(typeof body[0].bookingid).toBe('number');
        }
});