# Expense-tracker
A web page to log expenses in any currency and see them converted live into home currency using live exchange rates.

## Live Demo

[View live site](https://steph-craft.github.io/Expense-tracker/)

## Features

- Add an expense with a description, amount, currency, and category
- Every expense shows both its original currency and its converted value in the current home currency
- A running total, converted into the home currency, that updates automatically as expenses are added or removed
- Delete any expense from the list
- Filter the expense list by category
- Change the home currency at any time — rates refresh automatically
- Loading and error states for the exchange rate API, so the UI never silently breaks if the fetch fails

## Tech Used

- **HTML5 & CSS3** — semantic structure, Flexbox layout, responsive design
- **JavaScript (ES Modules)** — code is split across `api.js`, `state.js`, `utils.js`, `ui.js`, and `main.js`, connected with `import`/`export`
- **REST API:** [open.er-api.com](https://open.er-api.com) — free, no API key required
- **Jest** — unit testing for pure utility functions
- **ESLint** — static analysis, using the `eslint:recommended` rule set

## Project Structure

```
expense-tracker/
  index.html
  style.css
  src/
    api.js      - fetches live exchange rates
    state.js    - immutable expense array/object updates (spread operator)
    utils.js    - pure functions: conversion, totals, filtering, formatting
    ui.js       - all DOM rendering
    main.js     - wires everything together, handles events
  tests/
    utils.test.js
  .eslint.config.json
  babel.config.json
  package.json
  README.md
```

## How to Run It Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/steph-craft/expense-tracker.git
   cd expense-tracker
   ```
2. Install dev dependencies (needed for tests and linting, not for running the app itself):
   ```bash
   npm install
   ```
3. Open `index.html` directly in your browser, or use the VS Code "Live Server" extension for auto-refresh while editing. No build step or server is required to use the app.

### Running Tests

```bash
npm test
```
Runs the Jest test suite in `tests/utils.test.js`, covering currency conversion, total calculation, category filtering, and formatting — including edge cases like missing or zero exchange rates.

### Running the Linter

```bash
npm run lint
```
Runs ESLint across the project using the `eslint:recommended` config. The project passes with no errors.

## What I'd Improve With More Time

- Cache fetched rates in `localStorage` so the app still shows the last known rates (clearly marked as "stale") if the API is unreachable on load, instead of just showing an error.
- Add a date/time field per expense and a way to view spending trends over time.
- Persist expenses between sessions, since right now the list resets on every page refresh.
- Add proper form validation messages per field instead of one general status banner.
