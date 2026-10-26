# local-census-data Specification

## Purpose
Give a local visitor a census table the explorer can list and group without a separate database setup.

## Requirements

### Requirement: Local rows render in the explorer

The local stack SHALL serve a `census_learn_sql` table with `age`, `education`, and `sex`. The explorer SHALL list those columns and SHALL show grouped rows from that table.

#### Scenario: Education groups

- **WHEN** a visitor opens the education column on a freshly started local stack
- **THEN** the page lists education values from the seed, including `Bachelors`, with a count and an average age
