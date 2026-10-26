# Tasks

## 1. Query cache

- [ ] 1.1 Add TanStack Query and a client provider. Verify the existing tree still renders before any fetch moves.
- [ ] 1.2 Load column names from a query. Verify the menu and the home cards list the same names, and a failed read does not clear a previous success.
- [ ] 1.3 Load the three page reads as one query keyed by the route column. Verify a route change from `age` to `education` requests `education` and cannot apply a late `age` response.
- [ ] 1.4 Drive loading, error, retry, and empty from that query. Verify the current table status tests pass without the page saga.
- [ ] 1.5 Remove the page and column sagas and the active-variable slice once nothing reads them. Verify typecheck and the route tests pass.

## 2. Alternative, only if a single store is required

- [ ] 2.1 If TanStack Query is rejected, repeat tasks 1.2–1.5 with RTK Query endpoints instead, and keep the route as the selected column.
