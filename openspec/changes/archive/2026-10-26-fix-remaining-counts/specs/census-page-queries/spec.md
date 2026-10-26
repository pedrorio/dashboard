# Spec Delta

## ADDED Requirements

### Requirement: Remaining counts exclude the first page

The remaining row count SHALL be the non-NULL values of the column that are outside the first page of groups. That page SHALL be the same groups the table shows. The remaining distinct count SHALL be how many distinct non-NULL values exceed that page size, and SHALL be 0 when they fit. NULL values SHALL NOT be counted in either figure.

#### Scenario: More values than one page

- **WHEN** a column has more than 100 distinct non-NULL values
- **THEN** the remaining distinct count is the excess over 100 and the remaining row count is the non-NULL values whose groups are not on that first page

#### Scenario: Values fit on one page

- **WHEN** a column has 100 or fewer distinct non-NULL values
- **THEN** both remaining counts are 0
