# Design

## Context

See proposal.md. The menu is a class component. Options are router links, because choosing one navigates to `/explorer/<column>`.

## Goals / Non-Goals

**Goals:**

- Operate the menu without a pointer.
- Give the list an accessible name and a selected option.
- Isolate hover timers per instance.

**Non-Goals:**

- Typeahead.
- Removing hover. Pointer users keep the existing open-on-hover behaviour, but it can no longer block click and keyboard.

## Decisions

- Use the listbox pattern on the existing links: the trigger points at the list with `aria-controls`, and each link is an option. Arrow keys move DOM focus rather than only `aria-activedescendant`, so Enter on a focused link still navigates.
- Store `hoverTimer` on the instance. A module-level counter is used only to give each list a unique id.
- A document `mousedown` listener is attached only while that menu is open, and ignores presses inside its root.

## Risks / Trade-offs

- [Hover-open plus click-toggle can close a menu the pointer just opened] → Click remains the explicit control. Hover delays stay short and per menu.
- [A missing brace in the menu container's small-screen rule dropped that rule] → The stylesheet now closes the media query so the centering rule applies.
