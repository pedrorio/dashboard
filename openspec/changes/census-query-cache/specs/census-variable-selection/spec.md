# Spec Delta

## MODIFIED Requirements

### Requirement: Route names the column

The explorer SHALL treat the `variableName` segment of `/explorer/:variableName` as the census column for that page. The client SHALL NOT require a separate stored selection to decide which column to show.

#### Scenario: Direct visit to a known column

- **WHEN** a visitor opens `/explorer/age` and the loaded column list includes `age`
- **THEN** the page selects `age` and requests a page of results for `age`

#### Scenario: Column list not loaded yet

- **WHEN** the explorer opens a route before the column list has loaded
- **THEN** the page does not send the visitor to the not-found screen

#### Scenario: Unknown column after the list loads

- **WHEN** the column list has loaded and does not include the route's variable
- **THEN** the page navigates to the not-found screen

### Requirement: Choosing a column from the menu

Activating a column in the menu SHALL navigate to `/explorer/<column>`. That route SHALL be enough to select the column.

#### Scenario: Activate a column link

- **WHEN** the visitor activates the link for `education`
- **THEN** the route is `/explorer/education` and the page shows `education`
