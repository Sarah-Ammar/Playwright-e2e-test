# Thomann Technical Task - Cable Chooser Automated Test

## Description
This repository contains automated end-to-end tests for Thomann.de's CableGuy interface using Playwright. The test suite validates critical user workflows including:

- Dynamic cable configuration (random category/subcategory selection)
- Product page validation
- Shopping basket interactions
- Cross-browser compatibility (Chromium, Firefox, WebKit)

Key features:


Built with:
- TypeScript
- Playwright Test Runner
- GitHub Actions (for CI)

Designed for:
- QA automation engineers
- Regression testing
- Browser compatibility verification

## Installation

### Prerequisites
- Node.js v18+
- npm
- Git (for version control)

### Setup Steps
1. Clone the repository:
   git clone [https://github.com/Sarah-Ammar/thomann-playwright-tests.git](https://github.com/Sarah-Ammar/thomann-tech-task.git)
   cd thomann-playwright-tests

2. Install dependencies:
npm install

3. Install Playwright browsers:
npx playwright install



## Usage
npx playwright test --headed

## Project Structure
thomann-tech-task/
├── node_modules/          # Project dependencies
├── pages/                 # Page Object Model classes
│   ├── basketPage.ts      # Shopping basket interactions
│   ├── cableGuy.ts        # CableGuy configuration page
│   └── productPage.ts     # Product page interactions
├── playwright-report/     # HTML test reports
├── test-results/          # Raw test output
├── tests/                 # Test specifications
│   └── test-scenario-cableguy.spec.ts  # Main test scenario
├── failed-tests-screenshots/ # Automatic failure screenshots
├── .gitignore             # Version control exclusions
├── package-lock.json      # Dependency lockfile
├── package.json           # Project configuration
├── playwright.config.ts   # Playwright settings
└── README.md             # Project documentation