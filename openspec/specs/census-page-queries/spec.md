# census-page-queries Specification

## Purpose

Load one page of census results for a column by reading the grouped rows and the two remaining-count figures, and ignore responses from requests that a newer request has replaced.

## Requirements

### Requirement: Three reads for one page

A page request for a column SHALL read, together, the grouped rows for that column, the remaining total count, and the remaining count of distinct values. The page SHALL apply those three results as one success. If any of the three reads fails, the page request SHALL fail and SHALL NOT apply a partial page.

#### Scenario: All three reads succeed

- **WHEN** a page is requested for a known column and all three reads succeed
- **THEN** the stored page includes the rows, both remaining counts, and the requested page number

#### Scenario: One read fails

- **WHEN** a page is requested and any of the three reads fails
- **THEN** the page is marked failed and the previous successful rows stay unchanged

### Requirement: A newer page request drops the older one

When a page request starts while an earlier page request is still running, the client SHALL cancel the earlier request and SHALL NOT apply that earlier response.

#### Scenario: Rapid column changes

- **WHEN** a page is requested for `age` and, before it finishes, a page is requested for `education`
- **THEN** only the `education` response can update the stored page

### Requirement: Column list read

The home page and the variable menu SHALL request the census column names. A successful response SHALL replace the column list with each returned `column_name`. A failed response SHALL leave the stored column list unchanged.

#### Scenario: Column names succeed

- **WHEN** the column-name read succeeds with `age` and `education`
- **THEN** the stored column list is `age` and `education`

#### Scenario: Column names fail

- **WHEN** the column-name read fails
- **THEN** the stored column list is unchanged

### Requirement: Column names stay lowercase

The column-name query SHALL return each name under the key `column_name` on MySQL 9 and on MariaDB 10.11. It SHALL list only columns of `census_learn_sql` in the current database.

#### Scenario: MySQL 9 column list

- **WHEN** the column-name query runs against the seeded table on MySQL 9
- **THEN** each row has `column_name` and the names include `age`, `education`, and `sex`

#### Scenario: MariaDB column list

- **WHEN** the column-name query runs against the seeded table on MariaDB 10.11
- **THEN** each row has `column_name` and the names include `age`, `education`, and `sex`

### Requirement: Remaining counts exclude the first page

The remaining row count SHALL be the non-NULL values of the column that are outside the first page of groups. That page SHALL be the same groups the table shows. The remaining distinct count SHALL be how many distinct non-NULL values exceed that page size, and SHALL be 0 when they fit. NULL values SHALL NOT be counted in either figure.

#### Scenario: More values than one page

- **WHEN** a column has more than 100 distinct non-NULL values
- **THEN** the remaining distinct count is the excess over 100 and the remaining row count is the non-NULL values whose groups are not on that first page

#### Scenario: Values fit on one page

- **WHEN** a column has 100 or fewer distinct non-NULL values
- **THEN** both remaining counts are 0
