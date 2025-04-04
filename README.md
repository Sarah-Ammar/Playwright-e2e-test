
# Thomann Website - Cable Chooser Automated Test

## Description
This repository contains automated end-to-end tests for Thomann.de's CableGuy interface using Playwright. The test suite validates critical user workflows including:

- Dynamic cable configuration (random category/subcategory selection)
- Product page validation
- Shopping basket interactions
- Cross-browser compatibility (Chromium, Firefox, WebKit)

### Key Features:
- **Built with**:
  - TypeScript
  - Playwright Test Runner
  - GitHub Actions (for CI)

- **Designed for**:
  - QA automation engineers
  - Regression testing
  - Browser compatibility verification
  
  > *Note: WebKit may require additional dependencies on Ubuntu-based systems. Ensure all necessary libraries are installed to avoid compatibility issues. See [Playwright WebKit Dependencies](https://playwright.dev/docs/browsers#installing-browsers) for more details.*
---

## Installation

### Prerequisites:
- Node.js v18+
- npm
- Git (for version control)

### Setup Steps:
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sarah-Ammar/Playwright-e2e-test.git
   cd thomann-tech-task
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright browsers**:
   ```bash
   npx playwright install
   ```

---

## Usage

### Run tests in **headed mode** (visible browser):
```bash
npx playwright test --headed
```

### Run tests in **headless mode** (default):
```bash
npx playwright test
```

### Run a **specific test file**:
```bash
npx playwright test tests/test-scenario-cableguy.spec.ts
```
Note: Test execution reports are automatically stored in the playwright-report folder
---

## Project Structure

```
thomann-tech-task/
├── node_modules/                # Project dependencies
├── pages/                       # Page Object Model classes
│   ├── basketPage.ts            # Shopping basket interactions
│   ├── cableGuy.ts              # CableGuy configuration page
│   └── productPage.ts           # Product page interactions
├── playwright-report/           # HTML test reports
├── test-results/                # Raw test output
├── tests/                       # Test specifications
│   └── test-scenario-cableguy.spec.ts  # Main test scenario
├── failed-tests-screenshots/    # Automatic failure screenshots
├── .gitignore                   # Version control exclusions
├── package-lock.json            # Dependency lockfile
├── package.json                 # Project configuration
├── playwright.config.ts         # Playwright settings
└── README.md                    # Project documentation
```

---

## License

This project is intended for personal and educational use. Please contact Sarah Ammar for more information regarding usage rights.
