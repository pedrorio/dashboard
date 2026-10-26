# Proposal

## Why

Changing the explorer route requests the column already stored as the active selection. A back/forward navigation, or any route change that did not first store the new column, loads the previous column. The same check is copied in two lifecycle methods, and the route-change copy does not validate the new name. `componentWillReceiveProps` is also deprecated.

## What Changes

- When the route variable changes, select that variable and request its page.
- When the new variable is not in the loaded column list, open the not-found screen and do not request the previous column.
- Use one validation path from `componentDidMount` and `componentDidUpdate`.
- Cover route changes with a regression test.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `census-variable-selection`: A route change follows the new variable instead of the previously stored one.

## Impact

- `client/src/components/Table/Data.tsx` and its tests.
- No API, saga, or deploy changes.

## Out of scope

- Loading, error, and empty presentation. That is a separate change.
- Replacing the two-table header.
- Moving this component to hooks or off `connect`.
