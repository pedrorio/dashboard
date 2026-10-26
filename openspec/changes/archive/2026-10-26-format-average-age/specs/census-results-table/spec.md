# Spec Delta

## ADDED Requirements

### Requirement: Average age is shown in years and months

Each result row SHALL show the average age as whole years and a whole number of months. The month count SHALL be the decimal age multiplied by 12, rounded to the nearest whole month, with every 12 months carried into a year. A remainder of 0 months SHALL be omitted. A count of 1 SHALL use the singular year or month.

#### Scenario: Fractional year

- **WHEN** a row's average age is 34.25
- **THEN** the row shows 34 years 3 months

#### Scenario: Repeating fraction

- **WHEN** a row's average age is 32.6667
- **THEN** the row shows 32 years 8 months

#### Scenario: Whole years

- **WHEN** a row's average age is 37
- **THEN** the row shows 37 years

#### Scenario: Half year

- **WHEN** a row's average age is 49.5
- **THEN** the row shows 49 years 6 months

#### Scenario: One year

- **WHEN** a row's average age is 1
- **THEN** the row shows 1 year

#### Scenario: One month

- **WHEN** a row's average age is one twelfth of a year
- **THEN** the row shows 1 month

#### Scenario: One year and one month

- **WHEN** a row's average age rounds to 13 months
- **THEN** the row shows 1 year 1 month
