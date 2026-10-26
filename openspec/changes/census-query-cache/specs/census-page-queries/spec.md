# Spec Delta

## MODIFIED Requirements

### Requirement: A newer page request drops the older one

When a page request starts while an earlier page request is still running, the client SHALL cancel the earlier request and SHALL NOT apply that earlier response. Cancellation SHALL follow from the query that replaced it.

#### Scenario: Rapid column changes

- **WHEN** a page is requested for `age` and, before it finishes, a page is requested for `education`
- **THEN** only the `education` response can update the stored page
