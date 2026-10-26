# Proposal

## Why

A raw average such as 34.2500 is hard to read as an age. The table should say how many years and months that number is.

## What Changes

- Display each average age as whole years and a whole number of months.
- Leave the API response unchanged.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `census-results-table`: A result row shows the average age in years and months.

## Impact

- The results table and a client unit test.
- No API, database, or deploy changes.

## Out of scope

- Changing the SQL or the JSON average.
- Formatting any other number, colour contrast, and a CI badge.
