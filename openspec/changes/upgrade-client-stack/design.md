# Design

## Context

See proposal.md. `node-sass` 4.13.1 is why local install and pull-request checks use Node 12. Enzyme 3 is why the results table and the variable menu stayed as class components. TSLint 5 is the linter both packages run.

## Goals / Non-Goals

**Goals:**

- A maintained toolchain that still builds the current explorer.
- One recommended bundler, with a smaller fallback named up front.

**Non-Goals:**

- Implementing the upgrade now.
- Changing census behaviour as part of the toolchain move.

## Decisions

- Recommend Vite. It removes the webpack 4 plugin set (`awesome-typescript-loader`, `html-webpack-plugin` 3, `node-sass` loader) in one step. Current webpack is the fallback when the only goal is to leave Node 12: it keeps the existing config shape and still needs the loader and plugin upgrades.
- Recommend ESLint with `typescript-eslint` rather than another TSLint major. TSLint is archived.
- Recommend Testing Library and `jest-dom`. The class components can stay until their tests are rewritten; the upgrade does not require hooks by itself.
- Recommend the `sass` package (Dart Sass) as the drop-in for `node-sass`. The client currently has no `.scss` imports, so this is a dependency swap that unblocks current Node.

## Risks / Trade-offs

- [React 18 and react-redux 5 do not match] → Plan a react-redux upgrade with React 18. That is part of this proposal, not a separate product change.
- [Vite changes the dev-server path] → Keep the `/api` prefix and history fallback. The missing `/api` proxy on today's dev server should be fixed in that work, not left behind.
