# Contoso Bicycles Storefront

**Feature 001: Contoso Bicycles Storefront** - A modern e-commerce storefront built with Next.js and TypeScript.

## Overview

This repository contains the implementation of a bicycle e-commerce storefront with product browsing, cart management, and checkout functionality.

## Project Structure

```
sk-contoso-bike-store-frontend/
├── .github/              # GitHub configuration
│   ├── ISSUE_TEMPLATE/   # Issue templates
│   ├── workflows/        # GitHub Actions workflows
│   └── pull_request_template.md
├── docs/                 # Documentation
│   └── GITHUB_PROJECT_SETUP.md
├── scripts/              # Automation scripts
│   ├── generate-issues.js
│   └── generate-issues.ps1
└── specs/                # Feature specifications
    └── 001-i-am-building/
        ├── plan.md
        ├── tasks.md
        ├── data-model.md
        └── quickstart.md
```

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- GitHub CLI (`gh`) - for issue generation

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TeplrGuy/sk-contoso-bike-store-frontend.git
   cd sk-contoso-bike-store-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app.

## GitHub Project Setup

This repository includes automation for managing the implementation workflow using GitHub Projects.

### Quick Start

1. **Create the GitHub Project** - Follow the [GitHub Project Setup Guide](docs/GITHUB_PROJECT_SETUP.md)

2. **Generate Issues from Tasks:**
   ```bash
   # Using Node.js
   node scripts/generate-issues.js > /tmp/create-issues.sh
   bash /tmp/create-issues.sh
   
   # Or using PowerShell
   ./scripts/generate-issues.ps1 | Invoke-Expression
   ```

3. **Start Implementing** - Follow the workflow in the [setup guide](docs/GITHUB_PROJECT_SETUP.md)

### Project Board Columns

- **Backlog** - New issues
- **Ready** - Ready to be worked on
- **In Progress** - Active work
- **In Review** - PRs under review
- **QA** - Testing phase
- **Done** - Completed work

### Automation

The project includes automated workflows that:
- Add new issues to Backlog
- Move issues to In Progress when PRs are opened
- Move issues to In Review when PRs are marked ready
- Move issues to Done when PRs are merged
- Comment on PRs when CI fails

## Implementation Tasks

The feature is broken down into 21 tasks (T001-T021) organized in phases:

- **Phase A: Setup** (T001-T003) - Repository skeleton, linting, testing
- **Phase B: Tests First** (T004-T007) - Contract and integration tests
- **Phase C: Core Implementation** (T008-T014) - Data, models, UI components
- **Phase D: Integration** (T015-T017) - Validation, error handling, navigation
- **Phase E: Polish** (T018-T021) - Unit tests, E2E tests, CI, documentation

See [specs/001-i-am-building/tasks.md](specs/001-i-am-building/tasks.md) for detailed task descriptions.

## Development Workflow

### Branch Naming Convention

```
feat/001-TXXX-short-description
```

Examples:
- `feat/001-T001-setup-repo`
- `feat/001-T012-implement-homepage`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(001): add product listing component
test(001): add integration tests for cart
fix(001): resolve cart calculation bug
docs(001): update README with setup instructions
```

### PR Workflow

1. Create feature branch
2. Open draft PR early
3. Implement task following TDD
4. Run tests and linting
5. Mark PR as ready for review
6. Request review from @TeplrGuy and @kwkraus
7. Merge after approval and passing CI

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npx playwright test

# Run linting
npm run lint
```

## Building

```bash
# Production build
npm run build

# Start production server
npm start
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run linting
- `npm run format` - Format code

## Documentation

- [GitHub Project Setup Guide](docs/GITHUB_PROJECT_SETUP.md) - Complete setup instructions
- [Implementation Plan](specs/001-i-am-building/plan.md) - Feature planning document
- [Task List](specs/001-i-am-building/tasks.md) - Detailed task breakdown
- [Data Model](specs/001-i-am-building/data-model.md) - Entity definitions
- [Quickstart](specs/001-i-am-building/quickstart.md) - Quick reference guide

## Contributing

1. Pick a task from the project board
2. Create a feature branch
3. Follow the TDD approach
4. Keep PRs small and focused
5. Request reviews early
6. Ensure CI passes

### Code Style

- Use TypeScript for type safety
- Follow ESLint and Prettier rules
- Write tests for all new functionality
- Add accessibility attributes to UI components
- Document complex logic

## License

[Add your license information here]

## Contact

- @TeplrGuy
- @kwkraus

---

**Status:** 🚧 In Development

For detailed implementation status, see the [GitHub Project Board](../../projects).
