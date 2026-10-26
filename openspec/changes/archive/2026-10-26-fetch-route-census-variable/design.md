# Design

## Context

See proposal.md. The route bug is in the update path: it calls the page request with `nextProps.activeCensusVariable`. Direct entry already uses `match.params.variableName`, and only when the column list is already loaded. Both branches duplicate the known/unknown check.

## Goals / Non-Goals

**Goals:**

- The URL is the source of the column to load.
- One function decides "wait", "not found", or "select and fetch".
- Leave the deprecated lifecycle method.

**Non-Goals:**

- Rendering loading, error, or empty states.
- Cancelling the network request. `takeLatest` already drops a stale page request.

## Decisions

- Stay on a class component and read the new route from `componentDidUpdate`. React 16.9 has hooks, but this fix only needs the lifecycle React documents as the replacement for `componentWillReceiveProps`, and the existing Enzyme suite mounts classes reliably.
- Skip the fetch on the first resolution when rows for that column are already stored, matching the previous mount behaviour. A later route change always fetches, including a return to a column that was shown before.
- Validate only after the column list has loaded, so a slow column-name response does not send a direct visit to not-found.

## Risks / Trade-offs

- [Selecting the variable dispatches on every resolution and the connected props update] → The update effect returns unless the route or the column-list length changed, so it does not fetch again.
