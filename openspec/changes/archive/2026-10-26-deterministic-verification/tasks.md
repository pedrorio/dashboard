# Tasks

## 1. Deterministic route tests

- [x] 1.1 Replace the census service in the API route test with a canned column list. Verify `GET /census/column-names` returns `age` and `GET /random` returns 404 with no database running.
- [x] 1.2 Confirm Jest exits without an open MySQL handle. Verify with `--detectOpenHandles`.

## 2. Pull-request checks

- [x] 2.1 Add the API linter and make `yarn lint` and `yarn typecheck` pass in both packages. Verify both commands exit 0.
- [x] 2.2 Run type check, lint, and Jest for the client and the API on pull requests, on Node 12. Verify the workflow file uses `working-directory` and does not edit the deploy block.
- [x] 2.3 Restore the API test lines in the existing CI script. Verify the deploy keys and AWS block are unchanged.
