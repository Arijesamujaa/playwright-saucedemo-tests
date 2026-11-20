# Playwright Test Automation: SauceDemo

Automated UI and API tests built with Playwright and TypeScript, using the Page Object Model.

## What's covered
| Area | Tests |
|---|---|
| Login | valid login, wrong password, locked-out user, empty username |
| Cart | add item, add multiple, remove item, cart contents |
| Checkout | full order, missing first name, missing postal code |
| Sorting | price low to high |
| API (JSONPlaceholder) | GET single, GET list, POST create, 404 case |

## Tech
Playwright, TypeScript, GitHub Actions (CI runs on every push)

## Run locally
    npm install
    npx playwright install
    npx playwright test
    npx playwright show-report

## Structure
- `pages/`: page objects (selectors and actions)
- `tests/ui/`: UI tests
- `tests/api/`: API tests
