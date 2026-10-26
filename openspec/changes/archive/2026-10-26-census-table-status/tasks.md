# Tasks

## 1. State and view tests

- [x] 1.1 Add reducer tests for loading, success, and failure. Confirm they fail to compile or assert while the page state has no status.
- [x] 1.2 Add view tests for the loading live region, the error Retry button dispatching the route column, and the empty message. Confirm the loading test fails before the view exists.

## 2. Status on the page

- [x] 2.1 Store `status` and `errorMessage` from the page request, success, and failure actions. Verify the reducer tests pass.
- [x] 2.2 Render loading, error with retry, and empty instead of a blank area. Verify the view tests and the existing table tests pass.
