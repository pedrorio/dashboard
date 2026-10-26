# Spec Delta

## ADDED Requirements

### Requirement: Column names stay lowercase

The column-name query SHALL return each name under the key `column_name` on MySQL 9 and on MariaDB 10.11. It SHALL list only columns of `census_learn_sql` in the current database.

#### Scenario: MySQL 9 column list

- **WHEN** the column-name query runs against the seeded table on MySQL 9
- **THEN** each row has `column_name` and the names include `age`, `education`, and `sex`

#### Scenario: MariaDB column list

- **WHEN** the column-name query runs against the seeded table on MariaDB 10.11
- **THEN** each row has `column_name` and the names include `age`, `education`, and `sex`
