# Proposal

## Why

Almost all client state is the result of a server read: the column list, one page of rows, and two remaining counts. Redux-saga repeats that work with `takeLatest` so a slower response cannot overwrite a newer column. A query cache already does caching, cancellation, and loading/error status. This change is a proposal only.

## What Changes

- Load column names and the three page reads through TanStack Query.
- Keep the URL as the source of truth for the selected column. The active-variable reducer goes away once nothing else reads it.
- Let the query client's cancellation replace `takeLatest` for page requests.
- Keep RTK Query as the alternative if the app should stay a single Redux store. It fits less well here: the store would still exist mostly to cache server data, and the selected column would still belong to the URL rather than to a slice.

## Capabilities

### New Capabilities

- `census-server-state`: Column names and page results come from a query cache, and the selected column stays in the URL.

### Modified Capabilities

- `census-page-queries`: A newer page request still drops the older response, by query cancellation instead of a saga watcher.
- `census-variable-selection`: The selected column remains the route param. Choosing a column navigates; it does not need a separate selection action.

## Impact

- `client/src/sagas`, the page and column reducers, and the components that dispatch fetches today.
- The three parallel reads, the loading/error/empty states, and the route behaviour stay as specified.
- Not implemented in the current review.

## Out of scope

- Implementing the cache in the current review.
- Changing the API routes or the SQL.
- The stack upgrade, which can land before or after this proposal.
