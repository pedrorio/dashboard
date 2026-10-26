# Tasks

## 1. Keyboard and pointer tests

- [x] 1.1 Add tests that the trigger exposes `aria-expanded` and opens a listbox on click, Enter, and Space. Confirm they fail while the trigger has none of those attributes.
- [x] 1.2 Add tests for arrow-key movement, Escape returning focus to the trigger, an outside press closing the list, and two menus opening from hover without sharing a timer.

## 2. Listbox behaviour

- [x] 2.1 Implement the button, listbox, per-instance hover timer, and outside-press listener. Verify `Dropdown.spec.tsx` passes.
- [x] 2.2 Close the broken media query in the menu container styles and verify the dropdown stylesheet lints.
