# Spec Delta

## REMOVED Requirements

### Requirement: No status while waiting, empty, or failed

**Reason**: A blank area hides whether the page is loading, empty, or failed, and offers no retry.
**Migration**: Show a loading announcement, an empty message, or an error with a retry control.

## ADDED Requirements

### Requirement: Loading results are announced

While a page has not been requested or is still loading, the page SHALL show a loading message for the route column. That message SHALL be a polite live region marked busy.

#### Scenario: Waiting for rows

- **WHEN** the visitor opens a known column and its page is still loading
- **THEN** the page announces that results for that column are loading and marks the region busy

### Requirement: A failed page can be retried

When a page request fails, the page SHALL show an error message for the route column and a retry control. Activating retry SHALL request that same column again.

#### Scenario: Retry after failure

- **WHEN** the page request for `age` has failed and the visitor activates retry
- **THEN** the page shows an error for `age` and requests `age` again

### Requirement: An empty page is stated

When a page request succeeds with no rows, the page SHALL show an empty message for the route column and SHALL NOT show the results table.

#### Scenario: Successful page with no rows

- **WHEN** the page request for a column succeeds with an empty row list
- **THEN** the page states that the column has no results and does not show the results table
