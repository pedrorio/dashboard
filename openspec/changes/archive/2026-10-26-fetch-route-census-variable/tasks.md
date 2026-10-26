# Tasks

## 1. Regression test

- [x] 1.1 Add a test that starts on `/explorer/age` with `age` selected, changes the route to `/explorer/education`, and expects a page request for `education`. Confirm it fails on the current component because the request is for `age`.
- [x] 1.2 Add a test that changes the route to an unknown column and expects `/catch` with no page request. Confirm it fails while the explorer route stays in place.

## 2. Single route resolution

- [x] 2.1 Replace `componentWillReceiveProps` with `componentDidUpdate` and one `reconcileRoute` path used on mount and on route or column-list changes. Verify both new tests pass and the existing client suite still passes.
