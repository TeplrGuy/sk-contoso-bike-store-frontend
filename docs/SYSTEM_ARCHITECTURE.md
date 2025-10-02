# System Architecture: GitHub Project Automation

## Overview

This document describes the architecture of the GitHub Project automation system for Feature 001.

## Component Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     GitHub Repository                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────┐         ┌──────────────────┐              │
│  │  specs/          │         │  scripts/        │              │
│  │  └─ tasks.md     │────────▶│  ├─ gen-issues.js│              │
│  │     (21 tasks)   │  Parse  │  └─ gen-issues.ps1              │
│  └──────────────────┘         └──────────────────┘              │
│                                        │                          │
│                                        │ Generate                │
│                                        ▼                          │
│                               ┌──────────────────┐               │
│                               │ GitHub CLI       │               │
│                               │ Commands (20x)   │               │
│                               └──────────────────┘               │
│                                        │                          │
│                                        │ Execute                 │
│                                        ▼                          │
├────────────────────────────────────────────────────────────────┤
│                       GitHub Platform                            │
├────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────┐         ┌──────────────────┐              │
│  │  Issues          │────────▶│  Project Board   │              │
│  │  (T001-T020)     │  Added  │  ├─ Backlog      │              │
│  │  - Labels        │  Auto   │  ├─ Ready        │              │
│  │  - Assignees     │         │  ├─ In Progress  │              │
│  │  - Description   │         │  ├─ In Review    │              │
│  └──────────────────┘         │  ├─ QA           │              │
│         │                      │  └─ Done         │              │
│         │ Linked by            └──────────────────┘              │
│         │ "Closes #X"                  ▲                         │
│         ▼                              │                         │
│  ┌──────────────────┐                 │                         │
│  │  Pull Requests   │─────────────────┘                         │
│  │  - Draft PR      │   Auto Move                               │
│  │  - Ready PR      │   Based on                                │
│  │  - Merged PR     │   PR Status                               │
│  └──────────────────┘                                            │
│         │                                                         │
│         │ Trigger                                                │
│         ▼                                                         │
│  ┌──────────────────┐                                            │
│  │  GitHub Actions  │                                            │
│  │  ├─ Automation   │                                            │
│  │  │  Workflow     │                                            │
│  │  └─ CI Workflow  │                                            │
│  └──────────────────┘                                            │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Issue Generation Flow

```
tasks.md → Parser → Issue Data → GitHub CLI → GitHub Issues
   │          │          │            │            │
   21        Parse     Extract      Create       20
  tasks      regex     details     commands    issues
```

### 2. Automation Flow

```
New Issue → Backlog
             │
PR Opened → In Progress
    (Closes #X)
             │
PR Ready → In Review
             │
PR Merged → Done
             │
CI Failed → In Progress
          + Comment
```

## Component Details

### 1. Scripts (Issue Generation)

**Input**: `specs/001-i-am-building/tasks.md`

**Processing**:
- Parse task lines matching pattern: `^TXXX [P]? Title`
- Extract description, acceptance criteria
- Determine labels based on task content
- Generate GitHub CLI commands

**Output**: 20 GitHub CLI `issue create` commands

**Languages**:
- Node.js (`scripts/generate-issues.js`)
- PowerShell (`scripts/generate-issues.ps1`)

### 2. Templates (Consistency)

**Issue Template** (`.github/ISSUE_TEMPLATE/task.md`)
- Standardized format
- Required fields
- Labels and assignees

**PR Template** (`.github/pull_request_template.md`)
- Checklist
- Issue linking
- Type of change

**CI Template** (`.github/workflows/ci.yml.template`)
- Linting
- Testing
- Building
- E2E tests

### 3. Workflows (Automation)

**Project Automation** (`.github/workflows/project-automation.yml`)

Triggers:
- `issues: [opened, reopened]`
- `pull_request: [opened, ready_for_review, closed]`
- `workflow_run: [completed]` (CI status)

Actions:
- Extract issue number from PR body
- Move cards between project columns
- Comment on PR when CI fails

### 4. Documentation (Guidance)

**Setup Guide** (`docs/GITHUB_PROJECT_SETUP.md`)
- Step-by-step instructions
- Project board configuration
- Workflow setup

**Quick Start** (`docs/QUICK_START.md`)
- 5-minute setup
- Common commands
- Troubleshooting

**Examples** (`docs/EXAMPLE_ISSUES.md`)
- Sample issue outputs
- Label categories
- Parallel execution groups

## Label System

### Label Categories

```
┌─────────────────────────────────────────────┐
│ type:task                                    │
│   - Applied to all issues                   │
└─────────────────────────────────────────────┘
         │
    ┌────┴────┬────────┬────────┐
    ▼         ▼        ▼        ▼
┌─────────┬────────┬────────┬────────┐
│Priority │ Scope  │  Size  │ [P]    │
├─────────┼────────┼────────┼────────┤
│ p0      │ setup  │   S    │ Para-  │
│ p1      │ testing│   M    │ llel   │
│ p2      │ ui     │   L    │ Flag   │
│         │ backend│        │        │
│         │ docs   │        │        │
│         │ ci     │        │        │
└─────────┴────────┴────────┴────────┘
```

### Label Assignment Logic

```javascript
determineLabels(task) {
  labels = ['type:task']
  
  // Priority
  if (taskNum <= 3)      → 'priority:p0'
  else if (taskNum <= 7) → 'priority:p1'
  else                   → 'priority:p2'
  
  // Scope
  if (title.includes('test'))      → 'scope:testing'
  if (title.includes('setup'))     → 'scope:setup'
  if (title.includes('ui'))        → 'scope:ui'
  if (title.includes('model'))     → 'scope:backend'
  if (title.includes('doc'))       → 'scope:docs'
  if (title.includes('ci'))        → 'scope:ci'
  
  // Size
  if (taskNum <= 3)                → 'size:S'
  else if (title.includes('impl')) → 'size:L'
  else                             → 'size:M'
  
  return labels
}
```

## Task Dependencies

### Dependency Graph

```
Phase A (Setup)
  T001 ────┬──────────────┐
           │              │
           ▼              ▼
  [P] T002      [P] T003
           │              │
           └──────┬───────┘
                  │
Phase B (Tests)   ▼
         ┌────────┴────────┬─────────┬─────────┐
         ▼                 ▼         ▼         ▼
  [P] T004      [P] T005      [P] T006      [P] T007
         │                 │         │         │
         └────────┬────────┴─────────┴─────────┘
                  │
Phase C (Core)    ▼
         ┌────────┴────────┬─────────┬─────────┐
         ▼                 ▼         ▼         ▼
  [P] T008      [P] T009      [P] T010      [P] T011
         │                 │         │         │
         └────────┬────────┴─────────┴─────────┘
                  │
                  ▼
         T012 → T013 → T014
                  │
Phase D           ▼
         T015 → T016 → T017
                  │
Phase E           ▼
         ┌────────┴────────┬─────────┐
         ▼                 ▼         ▼
  [P] T018      [P] T019      [P] T020
```

### Parallel Execution Groups

```
Group 1: T002, T003, T004, T005
         (After T001 completes)
         
Group 2: T008, T009, T010, T011
         (After tests T004-T007)
         
Group 3: T018, T019, T020
         (After integration T015-T017)
```

## State Transitions

### Issue State Machine

```
┌─────────┐
│ Created │
└────┬────┘
     │
     ▼
┌─────────┐
│ Backlog │◀─────────────┐
└────┬────┘              │
     │                   │
     ▼                   │
┌─────────┐         ┌────┴────┐
│  Ready  │         │   CI    │
└────┬────┘         │ Failed  │
     │              └─────────┘
     ▼                   ▲
┌───────────┐            │
│In Progress│────────────┘
└─────┬─────┘
      │
      ▼
┌───────────┐
│ In Review │
└─────┬─────┘
      │
      ▼
┌─────────┐
│   QA    │
└────┬────┘
     │
     ▼
┌─────────┐
│  Done   │
└─────────┘
```

## Integration Points

### GitHub API (via CLI)

```
Scripts → gh CLI → GitHub API
           │         │
           │         ├─ Create Issues
           │         ├─ Add Labels
           │         ├─ Assign Users
           │         └─ Link to Project
           │
GitHub Actions
           │
           ├─ Webhook Triggers
           ├─ Project API
           └─ Comments API
```

### File System Integration

```
Repository Root
├── specs/
│   └── tasks.md ──────────┐
│                           │ Read
├── scripts/               │
│   ├── generate-issues.js ◀┘
│   └── generate-issues.ps1
│                           │ Write
├── .github/               │
│   ├── workflows/ ◀───────┘
│   └── templates/
└── docs/ ◀────────────────┐
                            │ Reference
```

## Security Considerations

### What's Safe

✅ Scripts run locally (no credentials needed)
✅ GitHub CLI handles authentication
✅ Workflows run in GitHub's secure environment
✅ No secrets in repository

### What's Protected

🔒 GitHub API token (managed by CLI)
🔒 Workflow permissions (GitHub manages)
🔒 Repository write access (required for owners)

## Performance Characteristics

### Issue Generation
- **Time**: ~1 minute for 20 issues
- **Rate Limit**: GitHub API (5000/hour authenticated)
- **Scalability**: Linear with task count

### Automation
- **Latency**: <10 seconds for workflow triggers
- **Reliability**: Built on GitHub Actions platform
- **Availability**: 99.9% uptime (GitHub SLA)

## Extensibility

### Adding New Task Types

1. Update `tasks.md` with new tasks
2. Adjust `MAX_TASKS` in scripts if needed
3. Run generation script
4. No code changes required

### Custom Labels

Modify `determineLabels()` function:
```javascript
if (task.title.includes('custom')) {
  labels.push('scope:custom')
}
```

### Additional Workflows

Add new `.github/workflows/*.yml` files:
- Code quality checks
- Security scanning
- Deployment automation

## Monitoring & Observability

### What to Track

- Issues created vs. tasks in tasks.md
- PR status transitions
- CI pass/fail rates
- Time in each column
- Bottlenecks

### How to Monitor

- Project board insights
- GitHub Actions logs
- Issue/PR labels and filters
- Custom GitHub queries

## Disaster Recovery

### Backup Strategy

✅ All code in Git repository
✅ GitHub maintains project data
✅ Issues recoverable from tasks.md
✅ Scripts can regenerate issues

### Recovery Procedures

1. Re-clone repository
2. Re-run issue generation scripts
3. Reconfigure project board
4. Re-link issues to project

## Conclusion

This architecture provides:

✅ **Automated issue generation** from structured tasks
✅ **Workflow automation** via GitHub Actions
✅ **Consistent formatting** with templates
✅ **Complete documentation** for all users
✅ **Cross-platform support** (Node.js + PowerShell)
✅ **Extensible design** for future needs

**Total System Complexity**: Low
**Maintenance Overhead**: Minimal
**User Adoption**: Easy (5-minute setup)

---

**Version**: 1.0
**Last Updated**: 2024
