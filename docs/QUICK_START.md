# Quick Start Guide

Get up and running with the Contoso Bicycles Storefront project in 5 minutes.

## Prerequisites

- Node.js v18+ installed
- GitHub CLI (`gh`) installed and authenticated
- Git configured

## Step 1: Setup Repository (2 min)

```bash
# Clone the repository
git clone https://github.com/TeplrGuy/sk-contoso-bike-store-frontend.git
cd sk-contoso-bike-store-frontend

# Install dependencies (when available)
npm install
```

## Step 2: Create GitHub Project (1 min)

1. Go to **Projects** tab on GitHub
2. Click **New project**
3. Choose **Board** template
4. Name it: `Feature 001: Contoso Bicycles Storefront`
5. Add columns: `Backlog`, `Ready`, `In Progress`, `In Review`, `QA`, `Done`

## Step 3: Generate Issues (1 min)

```bash
# Generate and create all 20 issues
node scripts/generate-issues.js > /tmp/create-issues.sh
bash /tmp/create-issues.sh
```

Or on Windows with PowerShell:

```powershell
./scripts/generate-issues.ps1 | Invoke-Expression
```

## Step 4: Start First Task (1 min)

```bash
# Create feature branch for T001
git checkout -b feat/001-T001-setup-repo

# Open draft PR
gh pr create --draft \
  --title "feat(001): [T001] Setup repo skeleton and dev dependencies" \
  --body "Closes #1"
```

## What You Get

✅ **GitHub Project Board** with 6 columns
✅ **20 GitHub Issues** (T001-T020) with:
- Proper labels (type, priority, scope, size)
- Assignees (@TeplrGuy, @kwkraus)
- Task descriptions and acceptance criteria
- Links to tasks.md

✅ **Automated Workflows** that:
- Add issues to Backlog
- Move issues through columns
- Comment on CI failures

✅ **Development Environment** ready for implementation

## Quick Commands Reference

### Issue Management

```bash
# List all issues
gh issue list

# View specific issue
gh issue view 1

# Assign issue to yourself
gh issue edit 1 --add-assignee @me
```

### Branch Management

```bash
# Create feature branch
git checkout -b feat/001-TXXX-description

# Push branch
git push -u origin feat/001-TXXX-description
```

### PR Management

```bash
# Create draft PR
gh pr create --draft --title "feat(001): [TXXX] Title" --body "Closes #X"

# Mark PR as ready
gh pr ready

# Add reviewers
gh pr edit --add-reviewer TeplrGuy,kwkraus

# Merge PR
gh pr merge --squash
```

### Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Run E2E tests
npx playwright test
```

## Implementation Order

Follow this sequence for best results:

1. **T001-T003**: Setup (do first, T002-T003 can be parallel)
2. **T004-T007**: Tests (all can run in parallel)
3. **T008-T011**: Data & Models (all can run in parallel)
4. **T012-T014**: UI Components (sequential)
5. **T015-T017**: Integration (sequential)
6. **T018-T020**: Polish (T018 and T019 can be parallel)

## Parallel Work Strategy

Multiple team members can work simultaneously on:

**Week 1:**
- Person A: T001 (blocking)
- Person B: Wait for T001
- Together: T002, T003 (parallel after T001)

**Week 2:**
- Person A: T004, T005
- Person B: T006, T007
- All in parallel

**Week 3:**
- Person A: T008, T009
- Person B: T010, T011
- All in parallel

## Common Workflows

### Start Working on a Task

```bash
# 1. Pick issue from project board
# 2. Create branch
git checkout -b feat/001-T002-linting

# 3. Open draft PR
gh pr create --draft --title "feat(001): [T002] Configure linting" --body "Closes #2"

# 4. Implement
# ... make changes ...

# 5. Test
npm test
npm run lint

# 6. Commit
git add .
git commit -m "feat(001): add eslint and prettier configs"

# 7. Push
git push

# 8. Mark ready when done
gh pr ready
```

### Handle CI Failure

```bash
# 1. Check CI logs
gh pr checks

# 2. Fix issues locally
# ... make fixes ...

# 3. Test again
npm test
npm run lint

# 4. Commit and push
git add .
git commit -m "fix(001): resolve linting errors"
git push
```

### Review Process

```bash
# As reviewer:
gh pr checkout 123
npm install
npm test
npm run lint

# Approve
gh pr review 123 --approve

# Request changes
gh pr review 123 --request-changes --body "Please add tests"
```

## Troubleshooting

### Script Not Finding tasks.md

```bash
# Make sure you're in the repository root
pwd  # Should show /path/to/sk-contoso-bike-store-frontend

# Check file exists
ls specs/001-i-am-building/tasks.md
```

### GitHub CLI Not Authenticated

```bash
gh auth login
# Follow the prompts
```

### Issues Not Appearing in Project

1. Make sure project automation is enabled
2. Manually add issues: `gh project item-add <project-id> --owner TeplrGuy`
3. Check project settings for automatic workflows

## Next Steps

1. ✅ Complete Quick Start steps above
2. 📖 Read [GITHUB_PROJECT_SETUP.md](GITHUB_PROJECT_SETUP.md) for details
3. 📋 Review [tasks.md](../specs/001-i-am-building/tasks.md) for task details
4. 🚀 Start implementing T001

## Resources

- [GitHub Project Setup Guide](GITHUB_PROJECT_SETUP.md)
- [Example Issues](EXAMPLE_ISSUES.md)
- [Task List](../specs/001-i-am-building/tasks.md)
- [Implementation Plan](../specs/001-i-am-building/plan.md)

## Getting Help

- Check [GITHUB_PROJECT_SETUP.md](GITHUB_PROJECT_SETUP.md) for detailed instructions
- Contact @TeplrGuy or @kwkraus
- Review [GitHub CLI Manual](https://cli.github.com/manual/)

---

**Time to First Contribution**: ~5 minutes ⚡
