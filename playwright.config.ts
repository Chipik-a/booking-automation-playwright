import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './src/tests',
    timeout: 30 * 1000,

    expect: {
        timeout: 5000,
    },

    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,

    reporter: [['list'], ['html', { open: 'never' }]],

    use: {
        actionTimeout: 5000,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        baseURL: 'https://automationintesting.online',
        headless: true,
    },

    projects: [
        {
            name: 'Desktop Chrome',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'Desktop Firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 13'] },
        },
    ],

    outputDir: 'test-results/',
});
