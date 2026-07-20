# AGENTS.md

## Project shape
- Small TypeScript app with a single source entrypoint at `src/index.ts`.
- `package.json` points `main` to `dist/index.js`; treat `dist/` as generated output from TypeScript, not a hand-edited source tree.
- Compiler settings in `tsconfig.json` are strict: `target: es2016`, `module: commonjs`, `strict: true`, `outDir: dist`.

## Work in this repo
- Make code changes in `src/`, then rebuild with:
  ```bash
  npm run build
  ```
- There are no repo-defined test or lint scripts today, so do not invent workflows that are not present in `package.json`.
- Keep changes minimal and aligned with the current one-file app unless new files are clearly needed.

## Conventions visible in the codebase
- Use plain TypeScript/CommonJS-compatible code; avoid adding framework assumptions or ESM-only patterns unless `tsconfig.json` changes.
- Follow the existing style in `src/index.ts`: simple statements, single quotes, and no unnecessary abstractions for trivial code.
- Preserve `forceConsistentCasingInFileNames` and `strict`-friendly code; the compiler is configured to catch sloppy typing and casing issues.

## Build/output awareness
- `dist/` is the build artifact location and should be regenerated, not edited directly.
- `.gitignore` already excludes common transient paths such as `/node_modules`, `/tmp`, `/out-tsc`, and editor state in `/.vscode/*`.

## Useful files to read first
- `package.json` — scripts and package entrypoint.
- `tsconfig.json` — compiler behavior and output location.
- `src/index.ts` — current application entrypoint and coding style.


