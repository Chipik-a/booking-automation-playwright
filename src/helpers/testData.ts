import { Amenities } from "@helpers/types.js";

export const validRoomRequiredOnly = {
    number: 101,
    type: "Single",
    accessible: true,
    price: 150,
};

export const validRoomWithAmenities = {
    number: 201,
    type: "Single",
    accessible: true,
    price: 370,
    amenities: {
        wifi: true,
        tv: true,
        radio: true,
        refreshments: false,
        safe: true,
        views: false,
    } as Amenities,
};

export const invalidRoom = [
    { number: undefined, type: "Single", accessible: true, price: 150, amenities: {} },
    { number: 102, type: "Single", accessible: true, price: undefined, amenities: {} },
];
export const BOOKING_FILTER_DATES = {
    checkin: '2025-10-12',
    checkout: '2025-10-15',
};