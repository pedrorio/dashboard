# Proposal

## Why

The local stack has no database, so a visitor never sees census rows.

## What Changes

- Load a small `census_learn_sql` table when the local database starts.
- Point the local API at that database.

## Capabilities

### New Capabilities

- `local-census-data`: The local stack serves a small census table the explorer can render.

### Modified Capabilities

- None.

## Impact

- Local compose only. The seed is a fixed set of people with age, education, and sex.

## Out of scope

- Production compose, AWS, deploy credentials, and the client stack.
