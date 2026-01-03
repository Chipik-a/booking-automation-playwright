import {Amenities} from "@helpers/types.js";

export const validRoom = {
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
    } as Amenities
};

export const invalidRoom = [
    { number: undefined, type: "Single", accessible: true, price: 150, amenities: {} }, // empty room
    { number: 102, type: "Single", accessible: true, price: undefined, amenities: {} }, // empty price
]