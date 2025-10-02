# Example Generated Issues

This document shows examples of the GitHub issues that will be created by the `generate-issues` scripts.

## Issue Generation Summary

- **Total Tasks in tasks.md**: 21 (T001-T021)
- **Issues Generated**: 20 (T001-T020, as per requirement)
- **Format**: Each task becomes one GitHub issue

## Example Issue #1: T001

**Title:** `T001: Setup repo skeleton and dev dependencies`

**Labels:**
- `type:task`
- `priority:p0`
- `scope:setup`
- `size:S`

**Assignees:**
- @TeplrGuy
- @kwkraus

**Body:**

```markdown
### Task Description
- Create or ensure a Next.js + TypeScript app exists at `src/` (or `frontend/` if you prefer).
     - Files/changes:
       - Add `package.json` (if missing) with: next, react, react-dom, typescript, tailwindcss (optional), jest, @testing-library/react, playwright (optional).
       - Add basic `tsconfig.json` and `.gitignore` entries for node_modules, .next
     - Path(s): repository root (`package.json`), `src/` app folder

### Acceptance Criteria
- [ ] `npm install` completes and `npm run dev` starts (can be a placeholder script if not yet implemented).

### References
- [specs/001-i-am-building/tasks.md](../blob/main/specs/001-i-am-building/tasks.md)

### Parallelizable
❌ NO - This task has dependencies
```

## Example Issue #2: T002

**Title:** `T002: Configure linting, formatting, and CI hooks`

**Labels:**
- `type:task`
- `priority:p0`
- `scope:setup`
- `size:S`

**Assignees:**
- @TeplrGuy
- @kwkraus

**Body:**

```markdown
### Task Description
- Add ESLint + Prettier configs and husky pre-commit hook (or simple lint-staged) in repo root.
     - Files: `.eslintrc.js`, `.prettierrc`, `.husky/` or `lint-staged` entry in package.json

### Acceptance Criteria
- [ ] Task completed as specified in tasks.md

### References
- [specs/001-i-am-building/tasks.md](../blob/main/specs/001-i-am-building/tasks.md)

### Parallelizable
✅ YES - This task can run in parallel with other [P] tasks
```

## Example Issue #5: T005

**Title:** `T005: Integration test: homepage renders product listing and hero`

**Labels:**
- `type:task`
- `priority:p1`
- `scope:testing`
- `size:M`

**Assignees:**
- @TeplrGuy
- @kwkraus

**Body:**

```markdown
### Task Description
- Create: `tests/integration/test_homepage.tsx`
     - Purpose: Using React Testing Library, render homepage component and assert hero and product cards appear (title, price, Add to Cart button)

### Acceptance Criteria
- [ ] Test initially fails (no components implemented).

### References
- [specs/001-i-am-building/tasks.md](../blob/main/specs/001-i-am-building/tasks.md)

### Parallelizable
✅ YES - This task can run in parallel with other [P] tasks
```

## Example Issue #12: T012

**Title:** `T012: Implement Homepage and ProductList components`

**Labels:**
- `type:task`
- `priority:p2`
- `scope:ui`
- `size:L`

**Assignees:**
- @TeplrGuy
- @kwkraus

**Body:**

```markdown
### Task Description
- Files: `src/components/Hero.tsx`, `src/components/ProductCard.tsx`, `src/pages/index.tsx` (or `src/app/page.tsx` for Next app router)
     - Behavior: Load products from `src/data/products.json`, render hero and product grid with Add to Cart button on each card.

### Acceptance Criteria
- [ ] `tests/integration/test_homepage.tsx` passes.

### References
- [specs/001-i-am-building/tasks.md](../blob/main/specs/001-i-am-building/tasks.md)

### Parallelizable
❌ NO - This task has dependencies
```

## Example Issue #20: T020

**Title:** `T020: CI integration for lint, test, and build`

**Labels:**
- `type:task`
- `priority:p2`
- `scope:ci`
- `size:M`

**Assignees:**
- @TeplrGuy
- @kwkraus

**Body:**

```markdown
### Task Description
- Files: `.github/workflows/ci.yml`
     - Steps: On PR, run install, npm run lint, npm test, and Playwright smoke test (can be optional gate)

### Acceptance Criteria
- [ ] CI pipeline runs and reports status.

### References
- [specs/001-i-am-building/tasks.md](../blob/main/specs/001-i-am-building/tasks.md)

### Parallelizable
✅ YES - This task can run in parallel with other [P] tasks
```

## Label Categories

### Type
- `type:task` - All tasks get this label

### Priority
- `priority:p0` - Setup tasks (T001-T003)
- `priority:p1` - Test tasks (T004-T007)
- `priority:p2` - Implementation tasks (T008-T020)

### Scope
- `scope:setup` - Repository setup and configuration
- `scope:testing` - Test creation and testing tools
- `scope:ui` - User interface components
- `scope:backend` - Models, services, data layer
- `scope:docs` - Documentation
- `scope:ci` - Continuous integration

### Size
- `size:S` - Small tasks (setup, config)
- `size:M` - Medium tasks (tests, minor features)
- `size:L` - Large tasks (major implementations)

## Parallel Execution Groups

Tasks marked with `[P]` can run in parallel:

**Group 1 (Setup & Initial Tests):**
- T002, T003, T004, T005

**Group 2 (Fixtures & Models):**
- T008, T009, T010, T011

**Group 3 (Unit Tests & Docs):**
- T018, T019, T021

## Using the Generated Issues

### View Generated Commands

```bash
node scripts/generate-issues.js
```

### Create All Issues

```bash
# Save to file
node scripts/generate-issues.js > /tmp/create-issues.sh

# Review the commands
cat /tmp/create-issues.sh

# Execute to create issues
bash /tmp/create-issues.sh
```

### Create Issues One by One

```bash
# Extract one command
node scripts/generate-issues.js | grep "T001" -A 1 | bash
```

## Expected Outcome

After running the script, you will have:

1. **20 GitHub Issues** created (T001-T020)
2. Each issue **linked to the project** (if configured)
3. Issues **automatically added to Backlog** column
4. Issues **ready to be assigned and worked on**

## Next Steps After Issue Creation

1. **Configure GitHub Project**
   - Create project board
   - Set up columns
   - Enable automation

2. **Start Implementation**
   - Pick first task (T001)
   - Create feature branch: `feat/001-T001-setup-repo`
   - Open draft PR
   - Implement and test

3. **Follow Workflow**
   - Complete tasks in order
   - Respect dependencies
   - Work on [P] tasks in parallel
   - Keep PRs small and focused

## Notes

- Task T021 is not included in the 20 issues (as per MAX_TASKS limit)
- Each issue links back to tasks.md for full details
- Parallel tasks are clearly marked
- Labels help filter and organize work
- Assignees ensure accountability

---

For more information, see [GITHUB_PROJECT_SETUP.md](GITHUB_PROJECT_SETUP.md)
