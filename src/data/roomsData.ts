import {Amenities} from "@helpers/types.js";

export const validRoomRequiredOnly = {
    type: "Single",
    accessible: true,
    price: 150
};

export const validRoomWithAmenities = {
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
    } as Amenities
};

export const invalidRoom = [
    { number: undefined, type: "Single", accessible: true, price: 150, amenities: {} }, // empty room
    { type: "Single", accessible: true, price: undefined, amenities: {} }, // empty price
]