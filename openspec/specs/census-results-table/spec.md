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

### Requirement: Header and body are separate tables

The results SHALL be presented as two tables: one table that contains only the column headings, and a second table that contains the body rows, so the headings stay visually fixed while the body scrolls. Heading cells SHALL NOT use a header scope. The results SHALL NOT have a table caption. Assistive technology SHALL NOT be given a single table that associates those headings with the body cells.

#### Scenario: Populated table structure

- **WHEN** populated results are shown
- **THEN** the document contains two tables, the first has a header row and no body rows, and the second has body rows and no header row
