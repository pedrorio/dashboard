# Proposal

## Why

The remaining counts use `COUNT` with `LIMIT 0,100`. `LIMIT` does not change what `COUNT` returns, so the amount shown equals the total and the remainder is always 0.

## What Changes

- Remaining distinct values are `max(COUNT(DISTINCT column) - page size, 0)`.
- Remaining rows are `COUNT(column)` minus the sum of `counter` over the same top groups the table shows.
- The page size is one shared constant, 100, used by the grouped query and both remainders.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `census-page-queries`: Remaining row and distinct counts exclude the first page instead of always returning 0.

## Impact

- The two remaining-count queries in the API, and the MySQL 9 test.
- No client stack change.

## NULL values

`COUNT(column)` skips NULL, and `GROUP BY column` still emits a NULL group whose `COUNT(column)` is 0. `COUNT(DISTINCT column)` also skips NULL. The total uses `COUNT(column)` and the shown amount is the sum of those counters, so NULL rows are in neither number. Remaining distinct values use `COUNT(DISTINCT column)` and do not treat that NULL group as an extra value. `SUM` over no groups is NULL and is treated as 0.

## Out of scope

- Changing the table's `counter` from `COUNT(column)` to `COUNT(*)`.
- Client stack upgrades.
