# Phase 0 Research: Contoso Bicycles storefront

## Decision: Frontend framework
- Chosen: Next.js with TypeScript (Next 14+ recommended)
- Rationale: Fast developer experience, built-in routing and image optimization, good support for server components if needed later. Aligns with requirement for responsive web UI and quick scaffolding.

## Decision: Data strategy
- Chosen: Mocked JSON fixtures stored under `src/data/` for MVP. No DB integration.
- Rationale: Keeps scope small, enables fast UI development and tests. Real backend integration is a follow-up task.

## Decision: Payments and Authentication
- Payments: Simulated payment flow for MVP returning success/failure responses.
- Authentication: Guest checkout only for MVP; account creation deferred to future.

## Alternatives considered
- Use a lightweight SPA (Vite + React) — rejected because Next.js offers image optimization and easier routing for page-based UI.
- Use a stub backend API with JSON server — rejected to keep repository simpler; we can add a mock API later if required.

## Next steps (Phase 1 inputs)
- Create `data-model.md` listing entities and validation.
- Create `quickstart.md` with how to run the frontend with mocked data.
- Create a small contracts note (README) describing UI-to-data expectations (no real API yet).
