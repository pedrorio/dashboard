# Spec Delta

## REMOVED Requirements

### Requirement: Header and body are separate tables

**Reason**: Two tables keep the header visually fixed but hide the relationship between headings and cells from assistive technology.
**Migration**: Render one table with a caption, column-scoped headings, and a sticky header row.

## ADDED Requirements

### Requirement: Results are one table with a sticky header

Populated results SHALL be one table with a caption naming the column. Each heading SHALL be a header cell scoped to its column. The header row SHALL stay visible at the top of the scrolling results while the body scrolls.

#### Scenario: Populated table structure

- **WHEN** populated results are shown for a column
- **THEN** the document contains one table, that table's caption names the column, its heading cells are column headers, and it has one body row per result

#### Scenario: Header stays put while the body scrolls

- **WHEN** the results body scrolls
- **THEN** the header row remains at the top of the scrolling region
