// import { expect } from "@playwright/test";
// import { testData } from "../../fixtures/bookingFixtures.ts"
// import { API_CONFIG } from "@helpers/apiClient.js";
//
// testData('API: find booking by Name', async ({ request, createBooking }) => {
//     const { firstName, lastName, bookingId } = createBooking;
//
//     const params = new URLSearchParams({
//         firstname: firstName,
//         lastname: lastName,
//     });
//
//     const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.booking}?${params.toString()}`;
//     const response = await request.get(url);
//
//     expect(response.status).toBe(200);
//
//     const body = await response.json();
//     expect(Array.isArray(body)).toBe(true);
//
//     const found = body.some(
//         (b: {bookingId: number}) => b.bookingId === bookingId
//     );
//
//     expect(found).toBe(true);
// });