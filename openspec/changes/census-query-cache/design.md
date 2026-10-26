# Design

## Context

See proposal.md. The store has three slices. Two are server data. `activeCensusVariable` copies the route param. `takeLatest` on `FETCH_REQUEST` is the only thing that drops a stale page. The page saga fans out to three endpoints with `all`.

## Goals / Non-Goals

**Goals:**

- One recommended query library, and a named alternative.
- Preserve the URL as the selected column and preserve the three-read page.

**Non-Goals:**

- Implementing either library now.
- Introducing a global client cache for the API process.

## Decisions

- Recommend TanStack Query. The page query key is the column name (and the page number, once pagination uses it). The column-name query is a separate key. `staleTime` can keep the column list while the visitor moves between columns. In-flight cancellation on query-key change replaces `takeLatest`.
- The three reads stay one query function so a single failure still fails the page. The loading, error, and empty views read that query's status instead of `censusPaginatedData.status`.
- Retry on the error view calls `refetch` for the route column.
- RTK Query is the alternative when a single Redux store is a requirement. It would replace the sagas and the server slices with endpoints, and the route would still be the selected column. It is the worse fit while the store has no other client state worth keeping.

## Risks / Trade-offs

- [react-redux 5 and a new query library] → TanStack Query does not need react-redux. RTK Query does, and would pull the react-redux upgrade forward. That is another reason to prefer TanStack Query on this codebase.
- [Two proposals touch the same components] → The toolchain proposal and this one can land in either order. Neither is started here.
