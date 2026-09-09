const { test, expect } = require('@playwright/test');
const { getAuthToken } = require('../../utils/api-client');
const bookingData = require('../../testdata/bookings.json');

const BASE_URL = 'https://restful-booker.herokuapp.com';

test.describe.serial('Restful-Booker API', () => {
    let bookingId;
    let token;

    test.beforeAll(async ({ request }) => {
        token = await getAuthToken(request);
    });

    test('auth returns a valid token', async () => {
        expect(token).toBeTruthy();
        expect(typeof token).toBe('string');
    });

    test('create a booking (POST)', async ({ request }) => {
        const response = await request.post(`${BASE_URL}/booking`, {
            headers: { 'Content-Type': 'application/json' },
            data: bookingData.validBooking,
        });

        if (response.status() !== 200) {
            console.log('Response body:', await response.text());
        }
        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.bookingid).toBeDefined();
        expect(body.booking.firstname).toBe(bookingData.validBooking.firstname);

        bookingId = body.bookingid;
    });

    test('get the created booking (GET)', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/booking/${bookingId}`);

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.firstname).toBe(bookingData.validBooking.firstname);
        expect(body.totalprice).toBe(bookingData.validBooking.totalprice);
    });

    test('update the booking (PUT)', async ({ request }) => {
        const updatedData = {
            ...bookingData.validBooking,
            firstname: 'UpdatedName',
        };

        const response = await request.put(`${BASE_URL}/booking/${bookingId}`, {
            headers: { Cookie: `token=${token}` },
            data: updatedData,
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.firstname).toBe('UpdatedName');
    });

    test('delete the booking (DELETE)', async ({ request }) => {
        const response = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
            headers: { Cookie: `token=${token}` },
        });

        expect(response.status()).toBe(201); // Restful-Booker returns 201 on delete
    });

    test('deleted booking no longer exists (GET returns 404)', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/booking/${bookingId}`);
        expect(response.status()).toBe(404);
    });
});