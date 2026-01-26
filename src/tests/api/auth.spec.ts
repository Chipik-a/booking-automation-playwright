// import { test, expect} from "@playwright/test";
// import {API_CONFIG} from "@helpers/apiClient.ts";
//
// test('API: create token (auth)', async ({ request}) => {
//     let createdRoomIds: number[] = [];
//         const response = await request.post(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.auth}`, {
//             data: {
//                 username: API_CONFIG.credentials.username,
//                 password: API_CONFIG.credentials.password,
//             },
//         });
//         expect(response.status()).toBe(200);
//         const body = await response.json();
//         expect(body.token).toBeTruthy();
// });