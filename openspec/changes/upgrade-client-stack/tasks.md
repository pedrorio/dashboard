# Tasks

## 1. Toolchain

- [ ] 1.1 Replace `node-sass` with `sass` and install on a current Node. Verify `yarn install` and `yarn build` in `client/` succeed without Node 12.
- [ ] 1.2 Add ESLint with TypeScript support and remove TSLint from the client. Verify `yarn lint` passes and CI calls it.
- [ ] 1.3 Move the production and dev build to Vite, or to current webpack if that move stays smaller. Verify the dev server still falls back to `index.html` for `/explorer/:variableName` and proxies `/api`.
- [ ] 1.4 Upgrade React to 18 and the matching react-dom and react-redux. Verify the home page, the variable menu, and the results table render.
- [ ] 1.5 Replace Enzyme with Testing Library and port the table, menu, and route tests. Verify the existing route, keyboard, loading, error, and empty assertions still pass.
