import dotenv from "dotenv";
dotenv.config();

export const credentials = {
    valid: {
        username: process.env.ADMIN_USER!,
        password: process.env.ADMIN_PASSWORD!,
    },
    invalid: [
        {
            username: '',
            password: process.env.ADMIN_INVALID_PASSWORD!,
            description: 'empty username',
        },
        {
            username: process.env.ADMIN_INVALID_USER!,
            password: '',
            description: 'empty password',
        },
        {
            username: '',
            password: '',
            description: 'empty username and password',
        },
        {
            username: process.env.ADMIN_INVALID_USER!,
            password: process.env.ADMIN_PASSWORD!,
            description: 'wrong username',
        },
        {
            username: process.env.ADMIN_USER!,
            password: process.env.ADMIN_INVALID_PASSWORD!,
            description: 'wrong password',
        }
    ]
};
