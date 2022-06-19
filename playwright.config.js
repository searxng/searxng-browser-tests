// @ts-check
const { devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();


/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 3 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'experimental-allure-playwright',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Chromium 1920',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'Firefox 1920',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'Firefox 1280',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 960 },
      },
    },

    {
      name: 'Firefox 1024',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1024, height: 768 },
      },
    },

    {
      name: 'Firefox 1024 - centered',
      use: {
        ...devices['Desktop Firefox'],
        extraHTTPHeaders: { "Cookie": "center_aligment=1" },
        viewport: { width: 1024, height: 768 },
      },
    },

    {
      name: 'Firefox 1024 - centered - rtl',
      use: {
        ...devices['Desktop Firefox'],
        locale: 'he',
        extraHTTPHeaders: { "Cookie": "center_aligment=1" },
        viewport: { width: 1024, height: 768 },
      },
    },

    {
      name: 'Mobile Chrome - centered',
      use: {
        ...devices['Pixel 5'],
        extraHTTPHeaders: { "Cookie": "center_aligment=1" },
      },
    },

    {
      name: 'Mobile Chrome - centered - rtl',
      use: {
        ...devices['Pixel 5'],
        locale: 'he',
        extraHTTPHeaders: { "Cookie": "center_aligment=1" },
      },
    },

    {
      name: 'Firefox 1920 - rtl',
      use: {
        ...devices['Desktop Firefox'],
        locale: 'he',
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'Firefox 1920 - no js',
      use: {
        ...devices['Desktop Firefox'],
        javaScriptEnabled: false,
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'Firefox 1920 - dark mode',
      use: {
        ...devices['Desktop Firefox'],
        colorScheme: 'dark',
        viewport: { width: 1920, height: 1080 },
      },
    },

    {
      name: 'Chrome 1920 - high contrast',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        contextOptions: {
          forcedColors: 'active',
        },
      },
    },

    {
      name: 'Webkit 1920',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 12'],
      },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

module.exports = config;
