export const API_CONFIG = {
    baseURL: 'https://restful-booker.herokuapp.com',
    enpoints: {
        auth: '/auth',
        booking: '/booking',
    },
    credentials: {
        username: 'admin',
        password: 'password123',
    },
} as const;