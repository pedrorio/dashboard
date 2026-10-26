# Design

## Context

See proposal.md. The old header sat outside a 500px scrolling body. A sticky header has to live in the same table, so the scroll container must include the header and stay about as tall as the old header plus body.

## Goals / Non-Goals

**Goals:**

- One table in the accessibility tree.
- The same light header, pink outline, and dark body.

**Non-Goals:**

- A visible caption. The caption is available to assistive technology and clipped visually so the panel matches the previous layout.

## Decisions

- The scroll container is 560px: about 500px of body plus the header row. Header cells are `position: sticky; top: 0` with an opaque `#f7f7f7` background, which is the previous translucent white over the page background. An opaque background is required or rows show through the stuck header.
- The pink border stays on the header cells, not around the dark body, matching the previous frame.

## Risks / Trade-offs

- [A sticky header with `z-index` paints over the variable menu] → The menu panel uses a higher `z-index` so it stays above the header, which is where it sat before the header was sticky.

- [Sticky headers need a scrolling ancestor] → `TableFrame` is that ancestor with `overflow: auto`.
