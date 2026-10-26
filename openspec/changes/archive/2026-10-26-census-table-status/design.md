# Design

## Context

See proposal.md. The page saga already dispatches failure, and the reducer ignored it. The results component treated "no matching row" as render nothing.

## Goals / Non-Goals

**Goals:**

- Three explicit states with tests.
- Retry dispatches the same page request the route would.

**Non-Goals:**

- A spinner library.
- Clearing the column list when its own request fails.

## Decisions

- `status` is `idle`, `loading`, `success`, or `error` on the page state. A request sets `loading` and clears the error. Success replaces the page. Failure keeps the last rows in state but the view shows the error instead of them.
- Idle and loading share the loading message, because the first paint happens before the request is dispatched.
- A settled success or error is not refetched just because the component mounted. A route change still requests the new column.

## Risks / Trade-offs

- [Failure leaves the previous rows in state] → The view branches on status first, so those rows are not shown as the failed column.
