# Design

## Context

See proposal.md. `tsconfig.json` already sets `outDir` to `./dist/`. The committed `.js` files are an older compile that landed in `src/`. Webpack's extension list is `.tsx`, `.ts`, `.jsx`, `.js`, and Jest's `moduleFileExtensions` lists the TypeScript extensions first. A production webpack build does not write `.js` files back into `src/`.

## Goals / Non-Goals

**Goals:**

- One source file per client module.
- A gitignore and compiler `rootDir` that keep the next compile out of `src/`.

**Non-Goals:**

- Changing module resolution order.
- Deleting `dist` build output, which is already ignored.

## Decisions

- Ignore every `src/**/*.js` rather than only files that currently have a TypeScript sibling. The client source tree is TypeScript-only, and a conditional ignore cannot be expressed in gitignore.
- Set `rootDir` to `./src` so `tsc` emits under `dist/` even if the include set grows inside `src`.

## Risks / Trade-offs

- [A future hand-written `.js` file under `src/` is ignored] → The source tree is TypeScript. A `.js` module would be a new decision, not an accident.
