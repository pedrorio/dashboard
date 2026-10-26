# Proposal

## Why

MySQL 9 returns `information_schema` labels in uppercase, so the client never sees `column_name` and the column list stays empty. Local compose used MariaDB 10.11 only to dodge that. MySQL 9 also removed the `mysql_native_password` plugin.

## What Changes

- Return each column name under the key `column_name` on MySQL 9 and on MariaDB 10.11, limited to the current database.
- Run local compose and CI against MySQL 9. Keep the same seed and the same page queries.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `census-page-queries`: Column metadata uses the lowercase key `column_name` on MySQL 9 and MariaDB 10.11.

## Impact

- The column-name query, the `mysql2` driver (it must speak `caching_sha2_password`), local compose, and CI.
- No client stack change and no change to the remaining-count SQL.

## Out of scope

- The remaining-count queries that use `COUNT` with `LIMIT 0,100`. That behaviour stays.
- Client stack upgrades and refactors.
