# Proposal

## Why

The results header and the results body are two separate tables. The header stays visually fixed, but a screen reader cannot associate those headings with the cells.

## What Changes

- Render one `<table>` with a `<caption>`, a `<thead>`, and a `<tbody>`.
- Give each heading `scope="col"`.
- Keep the header visible while the body scrolls with `position: sticky`.
- Keep the light header, pink border, and dark scrolling body.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `census-results-table`: Populated results are one table whose header sticks, instead of two unrelated tables.

## Impact

- `client/src/components/Table/Data.tsx`, `styles.ts`, and the table test.
- No API or deploy changes.

## Out of scope

- Loading, error, and empty messages. Those are a separate change.
- Changing the columns or the page footer.
