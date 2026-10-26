# Tasks

## 1. Remove the generated copies

- [x] 1.1 Delete committed `.js` files that sit beside `.ts` or `.tsx` sources and verify `client/src` contains none. Verified by `compiledSources.spec.ts`.
- [x] 1.2 Ignore `src/**/*.js` and `src/**/*.js.map`, and set `rootDir` to `./src` with `outDir` `./dist/`. Verified by `compiledSources.spec.ts`.

## 2. Check the build still resolves TypeScript

- [x] 2.1 Run the client production webpack build and confirm it resolves `.ts` / `.tsx` entries and does not recreate `.js` files under `src/`.
