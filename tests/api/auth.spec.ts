import { test, expect} from "@playwright/test";
import {API_CONFIG} from "@helpers/apiClient.js";

test('API: create token (auth)', async ({ request}) => {
        const response = await request.post(`${API_CONFIG.baseURL}${API_CONFIG.enpoints.auth}`, {
            data: {
                username: API_CONFIG.credentials.username,
                password: API_CONFIG.credentials.password,
            },
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.token).toBeTruthy();
});