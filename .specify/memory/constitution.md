```markdown
# Contoso Bike Store — Web App Constitution

This document lists the minimal, non-technical and technical requirements for the Contoso Bike Store web application based on the project template. Keep it simple and focused.

## Core Principles

### I. Simplicity
Keep the UI and code straightforward. Prefer small components, clear responsibilities, and minimal external dependencies.

### II. User-First
Deliver a responsive, accessible and fast web experience across desktop and mobile. Prioritize essential user journeys (browse, search, view product, add to cart, checkout).

### III. Secure by Default
Protect user data and authentication flows. Apply secure headers, validate inputs, and avoid storing secrets in the client.

### IV. Testable
Automated tests must cover core UI behaviours and critical flows. Unit tests for components and one end-to-end smoke test for the main purchase path.

### V. Observable & Measurable
Log errors and page-level performance metrics. Failures should be visible in CI and runtime dashboards.

## Constraints & Standards

- Technology: Single-page web app using a modern framework (React, Vue, or similar) with TypeScript preferred.
- Browser Support: Latest two versions of major browsers (Chrome, Edge, Firefox, Safari).
- Accessibility: Meet WCAG 2.1 AA for primary user flows.
- Performance: Keep initial page load (first contentful paint) under 2s on a typical 3G/4G mobile profile; bundle sizes should be reasonable (use code-splitting).
- Security: Use HTTPS; follow OWASP best practices for client apps; do not embed secrets in source.
- Internationalization: Prepare strings for translation where applicable (keep simple for MVP).

## Development Workflow

- Source control: Use feature branches and open a PR for review before merging to main.
- Code quality: Enforce linting and formatting (ESLint/Prettier) in CI.
- Tests: Run unit tests and the E2E smoke test in CI; PRs must not reduce test coverage of critical flows.
- CI/CD: On merge to main run build, tests, and deploy to staging; production deploy requires a passing staging smoke test and manual approval.

## Governance

- The constitution is the source of truth for project-level requirements.
- Changes to this document require a short proposal in the project board and approval from at least one reviewer and one product owner.

**Version**: 1.0.0 | **Ratified**: 2025-10-01 | **Last Amended**: 2025-10-01
``` 