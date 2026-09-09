// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  // Retry twice in CI and once locally
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['monocart-reporter', {
    name: "Capitec Assessment - Test Report",
    outputFile: './monocart-report/index.html',
    }],
   ],
/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
projects: [
  {
    name: 'chromium',
    testDir: './tests/ui',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'firefox',
    testDir: './tests/ui',
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'webkit',
    testDir: './tests/ui',
    use: { ...devices['Desktop Safari'] },
  },
  {
    name: 'api',
    testDir: './tests/api',
  },
],

});

