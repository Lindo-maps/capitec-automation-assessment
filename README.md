# Capitec Automation Assessment

A Playwright test framework covering UI automation (SauceDemo) and API automation (Restful-Booker), built for the Automation Lead assessment.

I came into this from a C#/NUnit/RestSharp background, so this is my first Playwright JS framework — the structure follows the same page object and data-driven principles I use day to day, just translated into JavaScript.

## Tech stack

- Playwright Test (JavaScript)
- Page Object Model for UI tests
- Playwright's built-in `request` fixture for API tests (no separate HTTP client needed)
- Built-in HTML reporter

## Project structure

```
tests/
  ui/           - SauceDemo tests (auth, inventory, cart, checkout)
  api/          - Restful-Booker tests (auth, booking CRUD, validation)
pages/          - Page Object classes for the UI tests
testdata/       - JSON test data, kept separate from test logic
utils/          - Shared helpers (e.g. API auth token retrieval)
.github/workflows/ - CI pipeline
```

## Setup

1. Install Node.js LTS (18+) if you don't have it: https://nodejs.org
2. Clone this repo and install dependencies:
   ```
   git clone <repo-url>
   cd capitec-automation-assessment
   npm install
   npx playwright install
   ```

## Running the tests

Run everything:
```
npx playwright test
```

Run just the UI suite:
```
npx playwright test tests/ui
```

Run just the API suite:
```
npx playwright test tests/api
```

Run headed (see the browser while UI tests run):
```
npx playwright test tests/ui --headed
```

## Viewing results

After a run, open the HTML report:
```
npx playwright show-report
```
This shows a pass/fail breakdown per browser, with step-by-step traces for any failures.

## Test data

Booking payloads for the API tests live in `testdata/bookings.json`, kept separate from the test files themselves so data can be updated without touching test logic.

## Notes on design decisions

- The API tests (`tests/api/booking.spec.js`) run with `test.describe.serial`, since the CRUD flow deliberately chains — a booking created in one test is read, updated, and deleted in the following ones. This keeps the test data flow realistic (matching an actual booking lifecycle) rather than faking IDs.
- Restful-Booker is a shared public demo API and occasionally returns a 500 under load from other users testing against it. I added a retry (`retries: 1` locally, `2` in CI) in `playwright.config.js` to handle that gracefully rather than treating it as a hard failure.

## CI/CD

A GitHub Actions workflow (`.github/workflows/playwright.yml`) runs the full suite on every push.
