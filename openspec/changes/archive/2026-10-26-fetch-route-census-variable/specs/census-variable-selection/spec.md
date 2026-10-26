# Spec Delta

## REMOVED Requirements

### Requirement: Route changes request the previously selected column

**Reason**: The route is the visitor's selection. Requesting the stored column loads the previous census page after back/forward navigation.
**Migration**: Request and select the column named by the new route, or open the not-found screen when that column is unknown.

## ADDED Requirements

### Requirement: Route changes request the new column

When the route variable changes to a known column, the page SHALL select that column and SHALL request its results. The page SHALL NOT request the previously selected column. When the new name is absent from the loaded column list, the page SHALL open the not-found screen and SHALL NOT request the previous column.

#### Scenario: History navigation to another column

- **WHEN** the visitor is viewing `age` and the route changes to `education`
- **THEN** the page selects `education` and requests results for `education`

#### Scenario: Route changes to an unknown column

- **WHEN** the route changes to a name that is not in the loaded column list
- **THEN** the page navigates to the not-found screen and does not request the previously selected column
