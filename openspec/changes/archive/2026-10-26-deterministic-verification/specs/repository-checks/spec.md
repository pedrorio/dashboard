# Spec Delta

## Purpose

Prove the API routes and both packages without a live database, and run those checks on every pull request.

## ADDED Requirements

### Requirement: API route tests need no database

The API route tests SHALL finish without a running database. A column-names request in that suite SHALL succeed with the canned column `age`. An unknown path SHALL respond with 404. The suite SHALL NOT leave a database connection open.

#### Scenario: Column names without a database

- **WHEN** the column-names route is requested in the API test suite and no database is running
- **THEN** the response succeeds and its first column is `age`

#### Scenario: Unknown path

- **WHEN** an unknown path is requested in the API test suite
- **THEN** the response status is 404

### Requirement: Pull requests are typechecked, linted, and tested

A pull request SHALL typecheck, lint, and run the test suite for the client and for the API. The existing deploy configuration SHALL stay unchanged.

#### Scenario: A pull request is opened

- **WHEN** a pull request is opened
- **THEN** the client and the API each run a type check, the linter, and their test suite

#### Scenario: Deploy configuration

- **WHEN** the pull-request checks are added
- **THEN** the deploy credentials and AWS settings are the same as before
