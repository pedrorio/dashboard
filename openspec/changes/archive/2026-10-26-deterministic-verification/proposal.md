# Proposal

## Why

The API route tests were turned off in continuous integration because they opened a MySQL pool and failed without a database. Pull requests also had no type check, lint, or test run.

## What Changes

- Run the API route tests against a canned census service so they finish without a database.
- Run type check, lint, and the test suite for the client and the API on every pull request.
- Turn the API test command back on in the existing script section.
- Add the linter the API config already expected, and fix the violations that blocked that command.

## Capabilities

### New Capabilities

- `repository-checks`: Route tests run without a database, and a pull request typechecks, lints, and tests both packages.

### Modified Capabilities

- None.

## Impact

- API route tests, the API linter dependency, the pull-request workflow, and the script section of the existing CI file.
- No change to deploy credentials, the AWS block, or Docker deploy manifests.

## Out of scope

- Replacing Jest, TSLint, or the Node version.
- Running the suite against a live census database.
- The Elastic Beanstalk deploy and Docker Hub push.
