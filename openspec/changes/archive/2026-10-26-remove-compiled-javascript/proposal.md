# Proposal

## Why

Compiled JavaScript is committed beside the TypeScript sources for actions, reducers, sagas, services, and the client entry. Those copies drift from the sources they were generated from, and a resolver can load the stale copy.

## What Changes

- Delete the committed `.js` copies that sit next to `.ts` / `.tsx` sources.
- Ignore `src/**/*.js` and `src/**/*.js.map` so a local compile cannot be committed again.
- Keep TypeScript emit pointed at `dist` via `outDir` and `rootDir`.
- Lock the rule in with a test that fails if a compiled copy returns.

## Capabilities

### New Capabilities

- `client-module-sources`: The client source tree keeps a single TypeScript copy of each module, and the compiler emits elsewhere.

### Modified Capabilities

- None.

## Impact

- Client source files only. Webpack already resolves `.tsx` and `.ts` before `.js`, and imports have no extension, so the bundle still loads the TypeScript modules.
- No dependency, framework, or deploy changes.

## Out of scope

- Upgrading TypeScript, webpack, or the loader.
- Reformatting the TypeScript sources.
