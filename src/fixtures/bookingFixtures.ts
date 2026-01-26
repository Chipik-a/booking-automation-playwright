// import { test as base } from "@playwright/test";
// import { BookingId } from "../helpers/types.ts"
// import {API_CONFIG} from "@helpers/apiClient.ts";
//
// export const testData = base.extend<{ createBooking: BookingId }>
// ({
//     createBooking: async ({ request }, use ) => {
//         const data = {
//             firstName: "John",
//             lastName: "Doe",
//             totalprice: 123,
//             depositpaid: true,
//             bookingdates: {
//                 checkin: "2025-11-01",
//                 checkout: "2025-11-03",
//             }
//         };
//
//         // const res = await  request.post(
//         //     `${API_CONFIG.baseURL}${API_CONFIG.endpoints.booking}`,
//         //     {
//         //         data,
//         //         headers: {
//         //             "Content-Type": "application/json",
//         //         }
//         //     }
//         // );
//
//         const json = await res.json();
//
//         await use({
//             firstName: data.firstName,
//             lastName: data.lastName,
//             bookingId: json.bookingId,
//         })
//     }
//
// })