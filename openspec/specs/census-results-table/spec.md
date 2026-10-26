# census-results-table Specification

## Purpose

Show the grouped census responses for the selected column, including how many people gave each response and their average age, plus how much of the column remains off the current page.

## Requirements

### Requirement: Populated results

When a successful page is stored for the route's column and the first row contains that column, the page SHALL show one data row per result with the column value, the count, and the average age. The page SHALL also show the page number, how many responses remain, and how many distinct values remain.

#### Scenario: Rows for the route column

- **WHEN** the route column is `age` and the stored page has rows whose keys include `age`
- **THEN** the visitor sees each age, its count, and its average age, plus the page number and both remaining counts

### Requirement: Results are one table with a sticky header

Populated results SHALL be one table with a caption naming the column. Each heading SHALL be a header cell scoped to its column. The header row SHALL stay visible at the top of the scrolling results while the body scrolls.

#### Scenario: Populated table structure

- **WHEN** populated results are shown for a column
- **THEN** the document contains one table, that table's caption names the column, its heading cells are column headers, and it has one body row per result

#### Scenario: Header stays put while the body scrolls

- **WHEN** the results body scrolls
- **THEN** the header row remains at the top of the scrolling region

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
