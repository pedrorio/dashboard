# Proposal

## Why

The results area renders nothing while a page is loading, when the request fails, and when the successful page has no rows. A visitor cannot tell those cases apart or retry a failed request.

## What Changes

- Show a loading message with `aria-busy` and a polite live region while a page is idle or in flight.
- Show an error message and a Retry button that requests the same column again.
- Show an empty message when the successful page has no rows.
- Record loading, success, and failure on the page state, including the failure message.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `census-results-table`: Waiting, failure, and an empty page each have their own visible state.

## Impact

- The page reducer, the page saga's success payload, the results component, and tests.
- No API or deploy changes.

## Out of scope

- A failure state for the column-name request. That request still leaves the column list unchanged.
- Pagination controls.
