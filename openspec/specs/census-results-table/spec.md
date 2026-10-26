# census-results-table Specification

## Purpose

Show the grouped census responses for the selected column, including how many people gave each response and their average age, plus how much of the column remains off the current page.

## Requirements

### Requirement: Populated results

When a successful page is stored for the route's column and the first row contains that column, the page SHALL show one data row per result with the column value, the count, and the average age. The page SHALL also show the page number, how many responses remain, and how many distinct values remain.

#### Scenario: Rows for the route column

- **WHEN** the route column is `age` and the stored page has rows whose keys include `age`
- **THEN** the visitor sees each age, its count, and its average age, plus the page number and both remaining counts

### Requirement: No status while waiting, empty, or failed

The page SHALL render no table and no loading, empty, or error message while a page has not yet arrived, when the successful page has no rows, and when the page request has failed.

#### Scenario: Waiting for rows

- **WHEN** the visitor opens a known column and no matching rows are stored
- **THEN** the main area is empty

#### Scenario: Failed request

- **WHEN** the page request has failed
- **THEN** the main area is empty and offers no retry

#### Scenario: Successful page with no rows

- **WHEN** the page request succeeds with an empty row list
- **THEN** the main area is empty

### Requirement: Results are one table with a sticky header

Populated results SHALL be one table with a caption naming the column. Each heading SHALL be a header cell scoped to its column. The header row SHALL stay visible at the top of the scrolling results while the body scrolls.

#### Scenario: Populated table structure

- **WHEN** populated results are shown for a column
- **THEN** the document contains one table, that table's caption names the column, its heading cells are column headers, and it has one body row per result

#### Scenario: Header stays put while the body scrolls

- **WHEN** the results body scrolls
- **THEN** the header row remains at the top of the scrolling region
