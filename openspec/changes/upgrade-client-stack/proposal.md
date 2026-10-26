# Proposal

## Why

The client is pinned to React 16, webpack 4, TSLint, Enzyme, and `node-sass` 4. Those packages are unmaintained or incompatible with current Node, and the deprecated lifecycles they rely on already warn at runtime. This change is a proposal only. It is not part of the behaviour fixes.

## What Changes

- Move the UI to React 18.
- Replace webpack 4 with Vite. A move to current webpack is the smaller alternative if the Vite migration is larger than expected.
- Replace TSLint with ESLint.
- Replace Enzyme with Testing Library.
- Replace `node-sass` with the `sass` package.
- Revisit tests that depend on class lifecycles and Enzyme wrappers once Testing Library is in place.

## Capabilities

### New Capabilities

- `client-toolchain`: The client builds, lints, and tests on a maintained React, bundler, linter, and stylesheet compiler.

### Modified Capabilities

- None.

## Impact

- `client/package.json`, webpack config, TSLint config, Jest setup, and component tests. Docker and CI Node versions follow the new toolchain.
- No behaviour change is accepted until this proposal is implemented and archived.

## Out of scope

- Doing the upgrade in the current review.
- The API runtime, deploy credentials, and AWS settings.
- Rewriting census queries.
