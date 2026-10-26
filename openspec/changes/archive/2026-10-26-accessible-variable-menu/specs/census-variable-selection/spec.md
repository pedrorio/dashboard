# Spec Delta

## REMOVED Requirements

### Requirement: Variable menu opens on hover

**Reason**: A hover-only menu with one shared timer is not usable from a keyboard or a touch screen.
**Migration**: Open the same column list from the trigger button, the keyboard, and an optional per-menu hover.

## ADDED Requirements

### Requirement: Variable menu opens as a listbox

The variable menu SHALL be a button that controls a listbox of census columns. The button SHALL expose whether the list is open. The list SHALL open and close on click, tap, Enter, and Space. Arrow keys SHALL move through the options. Escape SHALL close the list and return focus to the button. A pointer press outside the menu SHALL close it. Hover MAY open and close a menu, and each menu SHALL time that hover on its own.

#### Scenario: Click or tap the trigger

- **WHEN** the visitor activates the variable button
- **THEN** the column list is shown and the button reports that it is expanded

#### Scenario: Enter or Space on the trigger

- **WHEN** the variable button has focus and the visitor presses Enter or Space
- **THEN** the column list toggles

#### Scenario: Arrow keys and Escape

- **WHEN** the list is open and the visitor presses Arrow Down and then Escape
- **THEN** focus moves to the next column and Escape closes the list with focus on the button

#### Scenario: Pointer press outside

- **WHEN** the list is open and the visitor presses outside the menu
- **THEN** the list closes

#### Scenario: Two menus hover independently

- **WHEN** the pointer enters two variable menus before either hover delay elapses
- **THEN** both menus can open
