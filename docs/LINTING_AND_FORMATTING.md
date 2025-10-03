# Linting and Formatting Setup

This document describes the linting and formatting configuration for the Contoso Bicycles Storefront project.

## Overview

The project uses:

- **ESLint** for code linting (JavaScript/TypeScript)
- **Prettier** for code formatting
- **Husky** for Git hooks
- **lint-staged** for pre-commit linting

## Configuration Files

### ESLint (`.eslintrc.js`)

ESLint is configured with:

- TypeScript support via `@typescript-eslint`
- React and React Hooks rules
- Next.js specific rules via `eslint-config-next`
- Accessibility rules via `eslint-plugin-jsx-a11y`
- Prettier integration to avoid conflicts

### Prettier (`.prettierrc`)

Prettier is configured with:

- Single quotes for strings
- 2 spaces for indentation
- 100 character line width
- Trailing commas in ES5 style
- Unix line endings (LF)

### Ignore Files

- `.eslintignore` - Excludes build artifacts, scripts, and dependencies from linting
- `.prettierignore` - Excludes build artifacts and minified files from formatting
- `.gitignore` - Standard Next.js ignore patterns

## Available Scripts

### Linting

```bash
# Run ESLint
npm run lint

# Run ESLint with auto-fix
npm run lint:fix
```

### Formatting

```bash
# Format all source files
npm run format

# Check formatting without making changes
npm run format:check
```

## Pre-commit Hook

A pre-commit hook is configured using Husky and lint-staged:

1. When you commit files, the hook automatically runs
2. Only staged files are processed
3. ESLint runs with `--fix` to auto-correct issues
4. Prettier formats the files
5. If there are linting errors that can't be auto-fixed, the commit is blocked

### What Gets Linted/Formatted

- `*.{ts,tsx,js,jsx}` - TypeScript and JavaScript files
  - ESLint with auto-fix
  - Prettier formatting
- `*.{json,css,md}` - Config and documentation files
  - Prettier formatting only

## Editor Integration

### VS Code

Install these extensions for the best experience:

1. **ESLint** - `dbaeumer.vscode-eslint`
2. **Prettier** - `esbenp.prettier-vscode`

Add to your `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
}
```

### Other Editors

- **WebStorm/IntelliJ**: Built-in ESLint and Prettier support
- **Vim/Neovim**: Use ALE, coc.nvim, or similar plugins
- **Sublime Text**: Install SublimeLinter-eslint and JsPrettier packages

## Troubleshooting

### Pre-commit Hook Not Running

If the pre-commit hook doesn't run:

```bash
# Reinstall husky hooks
npm run prepare
```

### TypeScript Version Warning

You may see a warning about TypeScript version compatibility. This is usually safe to ignore as long as your code compiles without errors.

### Linting Errors in Scripts

The `scripts/` directory is excluded from linting because it may use CommonJS syntax (`require`). If you need to lint scripts, add them individually or update `.eslintignore`.

## Best Practices

1. **Commit frequently** - The pre-commit hook ensures quality with each commit
2. **Run lint before PR** - Always run `npm run lint` before creating a pull request
3. **Format before review** - Run `npm run format` to ensure consistent formatting
4. **Fix warnings** - Address ESLint warnings, don't just disable them
5. **Use editor integration** - Get instant feedback while coding

## Continuous Integration

The linting and formatting checks will be enforced in CI (see T020: CI integration) to ensure code quality across the team.
