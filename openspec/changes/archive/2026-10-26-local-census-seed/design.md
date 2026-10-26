# Design

## Context

See proposal.md. The API reads `census_learn_sql` and groups by a column while averaging `age`. Local compose did not start a database.

## Goals / Non-Goals

**Goals:**

- `docker compose up` creates the table and the explorer shows those rows.

**Non-Goals:**

- A production database or a change to the SQL.

## Decisions

- The MariaDB image runs `db/seed.sql` on first start. The table is one row per person, with columns `age`, `education`, and `sex`. MariaDB returns `column_name` in lowercase, which is the field the client already reads.
- The local API gets its database settings only in `docker-compose.yml`.
- Dev images use Node 12 so `node-sass` can install. That stays on the locked runtime.

## Risks / Trade-offs

- [The seed is tiny] → It is enough to render groups. It is not the census dump.
