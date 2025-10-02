# GitHub Project Setup Guide

This guide explains how to set up the GitHub Project for **Feature 001: Contoso Bicycles Storefront** with automated workflows.

## Table of Contents
1. [Create GitHub Project](#create-github-project)
2. [Generate Issues from Tasks](#generate-issues-from-tasks)
3. [Workflow Automation](#workflow-automation)
4. [Implementation Workflow](#implementation-workflow)

## Create GitHub Project

### Step 1: Create Project (Beta)

1. Navigate to the repository on GitHub
2. Click on **Projects** tab
3. Click **New project**
4. Choose **Board** template
5. Name it: `Feature 001: Contoso Bicycles Storefront`

### Step 2: Configure Columns

Create the following columns (in order):
- **Backlog** - New issues are added here
- **Ready** - Issues ready to be worked on
- **In Progress** - Active work
- **In Review** - PRs under review
- **QA** - Testing phase
- **Done** - Completed work

### Step 3: Enable Built-in Automation

For each column, configure automation:

**Backlog:**
- Automation: "Add newly created issues"

**In Progress:**
- Automation: "Add pull requests when opened"

**In Review:**
- Automation: "Add pull requests when marked ready for review"

**Done:**
- Automation: "Add pull requests when merged"

## Generate Issues from Tasks

The repository includes scripts to automatically generate GitHub issues from `specs/001-i-am-building/tasks.md`.

### Prerequisites

- GitHub CLI (`gh`) installed and authenticated
  ```bash
  gh auth login
  ```

### Option 1: Using Node.js Script

```bash
# Generate commands
node scripts/generate-issues.js

# Or execute directly
node scripts/generate-issues.js > /tmp/create-issues.sh
bash /tmp/create-issues.sh
```

### Option 2: Using PowerShell Script

```powershell
# Generate commands
./scripts/generate-issues.ps1

# Or execute directly
./scripts/generate-issues.ps1 | Invoke-Expression
```

### What Gets Created

For each task (up to 20), the script creates an issue with:

**Title:** `TXXX: Task description` (e.g., `T001: Setup repo skeleton and dev dependencies`)

**Labels:**
- `type:task` - Always included
- `priority:p0/p1/p2` - Based on task phase
- `scope:setup/testing/ui/backend/docs/ci` - Based on task content
- `size:S/M/L` - Based on estimated complexity

**Assignees:**
- @TeplrGuy
- @kwkraus
- GitHub Copilot (where applicable)

**Body:**
- Task description from tasks.md
- Acceptance criteria checklist
- Reference to tasks.md
- Parallelizable flag

### Manual Issue Creation

If you prefer manual creation, use the issue template:

1. Go to **Issues** → **New Issue**
2. Select **Task** template
3. Fill in the details from tasks.md

## Workflow Automation

The repository includes GitHub Actions workflow (`.github/workflows/project-automation.yml`) that provides:

### Automated Actions

1. **Issue Created** → Adds to Backlog column
2. **PR Opened** → Moves linked issue to In Progress
3. **PR Ready for Review** → Moves linked issue to In Review
4. **PR Merged** → Moves linked issue to Done
5. **CI Fails** → Comments on PR and moves back to In Progress

### Linking Issues to PRs

To enable automation, link issues in your PR description:

```markdown
Closes #123
```

Or use keywords:
- `Closes #123`
- `Fixes #123`
- `Resolves #123`

## Implementation Workflow

### For Each Task:

#### 1. Create Feature Branch

```bash
git checkout -b feat/001-TXXX-short-description
```

Example naming:
- `feat/001-T001-setup-repo`
- `feat/001-T002-configure-linting`
- `feat/001-T012-implement-homepage`

#### 2. Open Draft PR Early

```bash
gh pr create --draft --title "feat(001): [TXXX] Task title" --body "Closes #<issue-number>"
```

The PR will:
- Use the PR template (`.github/pull_request_template.md`)
- Link to the issue automatically
- Move the issue to "In Progress"

#### 3. Implement the Task

Follow the specification in `specs/001-i-am-building/tasks.md`:
- Write tests first (TDD approach)
- Implement the functionality
- Add documentation if needed
- Follow linting and formatting rules

#### 4. Run Tests and CI Checks

```bash
npm run lint
npm test
npm run build
```

#### 5. Mark PR as Ready for Review

```bash
gh pr ready
```

This moves the issue to "In Review" column.

#### 6. Request Review

```bash
gh pr edit --add-reviewer TeplrGuy,kwkraus
```

#### 7. Merge After Approval

Once approved and CI passes:

```bash
gh pr merge --squash
```

This moves the issue to "Done" column.

## Best Practices

### Small, Focused PRs
- One task per PR
- Keep changes minimal and focused
- Easier to review and test

### Branch Naming Convention
- Format: `feat/001-TXXX-short-description`
- Consistent with feature numbering
- Descriptive of the work

### Commit Messages
- Follow conventional commits
- Examples:
  - `feat(001): add product listing component`
  - `test(001): add integration tests for cart`
  - `fix(001): resolve cart calculation bug`

### Parallel Work
- Tasks marked `[P]` can be worked on simultaneously
- Avoid merge conflicts by working on different files
- Rebase frequently from main branch

### Draft PRs
- Open draft PRs early to communicate intent
- Allows for early feedback
- Shows work in progress

## Troubleshooting

### Issue Not Moving to Column

Check that:
1. PR description includes `Closes #<issue-number>`
2. GitHub Actions workflow is enabled
3. Project automation rules are configured

### CI Failures

The workflow will automatically:
1. Comment on the PR
2. Move the issue back to "In Progress"
3. Block merge until fixed

### Merge Conflicts

```bash
git fetch origin main
git rebase origin/main
# Resolve conflicts
git rebase --continue
git push --force-with-lease
```

## Additional Resources

- [GitHub Projects Documentation](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Conventional Commits](https://www.conventionalcommits.org/)

## Next Steps

1. Create the GitHub Project
2. Run the issue generation script
3. Configure project automation
4. Start implementing tasks in order
5. Follow the TDD approach (tests first)
6. Keep PRs small and focused
7. Request reviews early and often

---

For questions or issues, contact:
- @TeplrGuy
- @kwkraus
