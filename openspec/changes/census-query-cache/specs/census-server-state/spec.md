# Spec Delta

## Purpose

Keep census server results in a query cache so a replaced column cannot apply a late response, while the URL remains the selected column.

## ADDED Requirements

### Requirement: Server results come from a query cache

Column names and a column's page SHALL be loaded through a query cache. The page query SHALL include the grouped rows and both remaining counts. The selected column SHALL be the name in the URL.

#### Scenario: Route change

- **WHEN** the visitor moves from `/explorer/age` to `/explorer/education` before the `age` page returns
- **THEN** the page shows `education` and the late `age` response does not replace it

#### Scenario: Selection stays in the URL

- **WHEN** the visitor chooses `education` from the variable menu
- **THEN** the address is `/explorer/education` and a reload of that address selects `education` again
