# Design

## Context

See proposal.md. The route test imported the census service, which creates a MySQL pool at import time. The API already had a TSLint config and no TSLint dependency. The client already typechecks and lints cleanly once empty interfaces are removed.

## Goals / Non-Goals

**Goals:**

- API route tests pass with no database and leave no open pool.
- A pull request runs the same type check, lint, and Jest commands locally used for each package.

**Non-Goals:**

- A live-database integration job.
- Changing the deploy provider, keys, or image push.

## Decisions

- Replace the census service module in the route test. The canned column-names response returns `age`. Unknown paths still hit the real 404 handler.
- Install TSLint 5.18.0, the same major and minor as the client, so the existing API `tslint.json` can run.
- Use Node 12 in the pull-request workflow. `node-sass` 4.13.1 has a prebuild for Node 12 and the rest of the lockfile was installed with that runtime.
- Leave the deploy block of the existing CI file untouched. Only the commented API image build and test lines in `script` / `before_install` are restored. Those now run the canned suite.

## Risks / Trade-offs

- [The canned suite does not prove the SQL] → Column queries stay covered by reading the service, not by this route test. A live database job is out of scope.
