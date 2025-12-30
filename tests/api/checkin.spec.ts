import {expect, test} from "@playwright/test";
import {BOOKING_FILTER_DATES} from "@helpers/testData.js";
import {API_CONFIG} from "@helpers/apiClient.js";

test( 'API: get bookings by checkin/checkout date', async ({request}) => {
    const { checkin, checkout } = BOOKING_FILTER_DATES;

    const params = new URLSearchParams( { checkin, checkout } );
    const url = `${API_CONFIG.baseURL}${API_CONFIG.enpoints.booking}?${params.toString()}`;
    console.log('Request URL:', url);

    const response = await request.get(url);
    console.log('HTTP status:', response.status());

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);

    console.log('Response body:', body);
})
