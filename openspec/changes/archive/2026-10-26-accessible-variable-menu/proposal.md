# Proposal

## Why

The census column menu opens only after a pointer hover, so keyboard and touch users cannot open it. The hover timer is one module-level variable, so one menu can cancel another's delay.

## What Changes

- Make the trigger a button with `aria-expanded`, `aria-controls`, and `aria-haspopup="listbox"`.
- Open and close on click, tap, Enter, and Space.
- Move through options with the arrow keys. Escape closes the list and returns focus to the trigger.
- Close on a pointer press outside the menu.
- Keep hover as a convenience, with a timer stored on that menu instance.
- Add keyboard and outside-click tests.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `census-variable-selection`: The variable menu is a disclosure listbox instead of a hover-only control.

## Impact

- `client/src/components/Dropdown/Dropdown.tsx`, its styles, and a new test.
- No API or deploy changes.

## Out of scope

- Replacing the link list with a separate routing library.
- Changing which columns the menu lists.
