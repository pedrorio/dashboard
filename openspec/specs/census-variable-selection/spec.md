# census-variable-selection Specification

## Purpose

Choose which census column the explorer shows, using the route as the visitor's selection and the variable menu as the way to change it.

## Requirements

### Requirement: Route names the column

The explorer SHALL treat the `variableName` segment of `/explorer/:variableName` as the census column for that page.

#### Scenario: Direct visit to a known column

- **WHEN** a visitor opens `/explorer/age` and the loaded column list includes `age`
- **THEN** the page selects `age` and requests a page of results for `age`

#### Scenario: Column list not loaded yet

- **WHEN** the explorer opens a route before the column list has loaded
- **THEN** the page does not send the visitor to the not-found screen

#### Scenario: Unknown column after the list loads

- **WHEN** the column list has loaded and does not include the route's variable
- **THEN** the page navigates to the not-found screen

### Requirement: Variable menu opens on hover

The variable menu SHALL open after the pointer hovers the trigger and close after the pointer leaves. Every menu instance SHALL share one hover timer. The menu SHALL NOT open from a click, tap, Enter, or Space on the trigger.

#### Scenario: Pointer hover

- **WHEN** the pointer hovers the trigger for the hover delay
- **THEN** the list of census columns is shown

#### Scenario: Two menus share a timer

- **WHEN** the pointer enters one menu and then another before the hover delay elapses
- **THEN** only the second menu can open

#### Scenario: Keyboard on the trigger

- **WHEN** the trigger has focus and the visitor presses Enter or Space
- **THEN** the column list stays closed

### Requirement: Choosing a column from the menu

Activating a column in the menu SHALL store that column as the active selection and navigate to `/explorer/<column>`.

#### Scenario: Activate a column link

- **WHEN** the visitor activates the link for `education`
- **THEN** `education` becomes the active selection and the route is `/explorer/education`

### Requirement: Route changes request the new column

When the route variable changes to a known column, the page SHALL select that column and SHALL request its results. The page SHALL NOT request the previously selected column. When the new name is absent from the loaded column list, the page SHALL open the not-found screen and SHALL NOT request the previous column.

#### Scenario: History navigation to another column

- **WHEN** the visitor is viewing `age` and the route changes to `education`
- **THEN** the page selects `education` and requests results for `education`

#### Scenario: Route changes to an unknown column

- **WHEN** the route changes to a name that is not in the loaded column list
- **THEN** the page navigates to the not-found screen and does not request the previously selected column
