# Tasks: Contoso Bicycles storefront (Feature 001 - 001-i-am-building)

**Input**: Design documents from `specs/001-i-am-building/` (plan.md, research.md, data-model.md, quickstart.md)

**Prerequisites**: Node.js v18+, repository root contains Next.js app or will be created under `frontend/` or `src/` per plan.

## Execution Flow (main)
1. Read `plan.md` for structure and tech stack
2. Generate tests-first tasks (TDD) that must fail before implementation
3. Create model/service implementation tasks
4. Implement UI pages and components
5. Integration and polish tasks

Notes on paths: This feature uses a frontend-only approach. The plan suggested `frontend/` or `src/` for the app; the tasks below target `src/` at the repo root. If you prefer `frontend/`, run a simple search-and-replace for the path.

---

Task IDs: T001, T002, ...

Phase A — Setup

T001   Setup repo skeleton and dev dependencies
     - Create or ensure a Next.js + TypeScript app exists at `src/` (or `frontend/` if you prefer).
     - Files/changes:
       - Add `package.json` (if missing) with: next, react, react-dom, typescript, tailwindcss (optional), jest, @testing-library/react, playwright (optional).
       - Add basic `tsconfig.json` and `.gitignore` entries for node_modules, .next
     - Acceptance: `npm install` completes and `npm run dev` starts (can be a placeholder script if not yet implemented).
     - Path(s): repository root (`package.json`), `src/` app folder


T002  [P] Configure linting, formatting, and CI hooks
     - Add ESLint + Prettier configs and husky pre-commit hook (or simple lint-staged) in repo root.
     - Files: `.eslintrc.js`, `.prettierrc`, `.husky/` or `lint-staged` entry in package.json
  
T003  [P] Add testing tool configs (Jest + RTL) and Playwright scaffold
     - Files: `jest.config.ts`, `tests/setupTests.ts`, Playwright config `playwright.config.ts` (optional)
     - Acceptance: `npm test` runs and returns exit code 0 or no tests found; Playwright `npx playwright test --list` returns available config.

---

Phase B — Tests First (TDD) — Contract + Integration tests (must be created and failing before implementation)

From available docs: `data-model.md` defines entities Product, Cart, Order. `quickstart.md` provides high-level scenarios (browse, product detail, add to cart, checkout). There are no detailed contracts/`contracts/` files, so we infer expected UI API / fixtures.

T004  [P] Contract-style test: load product fixtures and assert product listing shape
     - Create: `tests/contract/test_products_fixture.ts`
     - Purpose: Verify `src/data/products.json` (fixture) contains array of products with required fields (id, title, price, images[])
     - Acceptance: Test fails if fixture missing or schema invalid.
  
T005  [P] Integration test: homepage renders product listing and hero
     - Create: `tests/integration/test_homepage.tsx`
     - Purpose: Using React Testing Library, render homepage component and assert hero and product cards appear (title, price, Add to Cart button)
     - Acceptance: Test initially fails (no components implemented).
   
T006  [P] Integration test: product detail page shows images, price, Add to Cart
     - Create: `tests/integration/test_product_detail.tsx`
     - Purpose: Render ProductDetail component with fixture product and assert images, title, price and Add to Cart control.
     - Acceptance: Fails until component exists.
 
T007  [P] Integration test: cart flow - add item, view cart, checkout stub
     - Create: `tests/integration/test_cart_and_checkout.tsx`
     - Purpose: Simulate adding product to cart, navigating to cart, entering shipping stub and submitting checkout; assert success/failure UI paths exist.
     - Acceptance: Fails until cart flow implemented.

---

Phase C — Core Implementation (satisfy tests above)

Data layer and models (TDD order: create models after tests exist)

T008  [P] Add mocked data fixtures
     - Create: `src/data/products.json` and `src/data/sample-cart.json`
     - Content: At least 6 product objects (id, title, shortDescription, price (cents), images[], category, badges[])
     - Acceptance: `tests/contract/test_products_fixture.ts` should be able to read file (test still failing until implementation uses it).
    
T009  [P] Implement Product model / types
     - Create: `src/models/product.ts` (TypeScript type/interface)
     - Fields: id, title, shortDescription, price, images, category, badges
     - Acceptance: Type imported by components; static type check passes.

T010  [P] Implement Cart model / types and simple in-memory cart service
     - Create: `src/models/cart.ts`, `src/services/cartService.ts`
     - Methods: addItem(productId, qty), removeItem(productId), getCart(), clearCart()
     - Acceptance: Integration tests can import the service; service unit tests can exercise behavior.

T011  [P] Implement Order type and checkout stub service
     - Create: `src/models/order.ts`, `src/services/checkoutService.ts`
     - checkoutService.placeOrder(cart, shipping) → returns simulated success/failure (configurable)
     - Acceptance: Checkout integration test uses service and expects success/failure response handling.
   
UI components and pages

T012  Implement Homepage and ProductList components
     - Files: `src/components/Hero.tsx`, `src/components/ProductCard.tsx`, `src/pages/index.tsx` (or `src/app/page.tsx` for Next app router)
     - Behavior: Load products from `src/data/products.json`, render hero and product grid with Add to Cart button on each card.
     - Acceptance: `tests/integration/test_homepage.tsx` passes.

T013  Implement Product Detail page and component
     - Files: `src/pages/products/[id].tsx` (or app route equivalent), `src/components/ProductGallery.tsx`, `src/components/ProductDetail.tsx`
     - Behavior: Display multiple images, title, price, shortDescription, Add to Cart.
     - Acceptance: `tests/integration/test_product_detail.tsx` passes.


T014  Implement Cart page and UI
     - Files: `src/pages/cart.tsx`, `src/components/CartList.tsx`
     - Behavior: Show cart items, quantities, subtotal, and Checkout button that calls checkoutService.placeOrder
     - Acceptance: `tests/integration/test_cart_and_checkout.tsx` passes.

---

Phase D — Integration & App-level concerns

T015  Input validation and accessibility
     - Files: wherever forms exist (checkout form component)
     - Actions: Validate shipping fields (postalCode required, country required), ensure images have alt text, keyboard focus order and aria attributes on interactive controls
     - Acceptance: Lint/a11y checks and unit tests for validation pass.

T016  Basic logging and error handling
     - Files: `src/lib/logger.ts` (simple wrapper console or a no-op), add error boundaries where helpful (ErrorBoundary component)
     - Acceptance: errors surfaced in UI; tests for failure paths pass.

T017  Add simple client-side routing and navigation header
     - Files: `src/components/Header.tsx`, `src/components/Footer.tsx`
     - Behavior: Brand name, search input (can be non-functional for MVP), cart icon with count
     - Acceptance: Header renders and navigation works between pages.

---

Phase E — Polish, Tests, CI

T018  [P] Unit tests for models and services
     - Files: `tests/unit/test_cartService.ts`, `tests/unit/test_checkoutService.ts`
     - Acceptance: Unit tests pass.

T019  [P] E2E smoke test for main purchase path (Playwright)
     - Files: `tests/e2e/smoke.test.ts`
     - Steps: open homepage, open product, add to cart, go to cart, fill shipping, submit, assert success message
     - Acceptance: E2E test passes in CI (or locally if playwright configured).

T020  [P] CI integration for lint, test, and build
     - Files: `.github/workflows/ci.yml`
     - Steps: On PR, run install, npm run lint, npm test, and Playwright smoke test (can be optional gate)
     - Acceptance: CI pipeline runs and reports status.

T021  [P] Update docs and quickstart
     - Files: `README.md` at repo root and update `specs/001-i-am-building/quickstart.md` to reflect exact commands and any new scripts (e.g., `npm run dev`, `npm run test`, `npx playwright test`)
     - Acceptance: Developer can run quickstart steps and reach the app at http://localhost:3000

---

Parallel execution guidance
- Tasks marked `[P]` can run in parallel if they touch different files. Suggested parallel groups:
  - Group 1 (independent): T002, T003, T004, T005 (configs & tests scaffolding)
  - Group 2 (fixtures & models): T008, T009, T010, T011
  - Group 3 (unit tests & docs): T018, T021, T019 (E2E may be run after core UI exists)

Example agent commands (executable by a follow-up LLM agent):
- Create contract test: `create-file tests/contract/test_products_fixture.ts --content "..."`
- Create fixture: `create-file src/data/products.json --content "[...]"`
- Run tests: `pwsh -c "npm install; npm test"`

Dependencies (summary)
- Setup (T001-T003) before any tests or implementation
- Tests (T004-T007) must exist before implementing T012-T014
- Models (T009-T011) before services and UI components that consume them
- Integration (T015-T017) after core UI and services are implemented
- Polish (T018-T021) last

---

Files created by this task run:
- `specs/001-i-am-building/tasks.md` (this file)

If you want, I can now: (A) commit this file to git and open a PR, (B) scaffold the `src/` Next app and fixtures to start implementing T012-T014, or (C) generate more granular subtasks (split T012 into smaller steps for components). Which do you prefer?
