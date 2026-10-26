# Spec Delta

## Purpose

Build, lint, and test the client with maintained releases so it no longer depends on Node 12 or deprecated test and lint tools.

## ADDED Requirements

### Requirement: Maintained client toolchain

The client SHALL run on React 18, SHALL lint with ESLint, SHALL test UI behaviour with Testing Library, and SHALL compile styles with `sass` rather than `node-sass`. The bundler SHALL be Vite, or the current webpack if that migration is the smaller change that still leaves webpack 4.

#### Scenario: A clean install on a current Node

- **WHEN** a developer installs and builds the client on a current Node release
- **THEN** install and the production build finish without `node-sass` or Node 12

#### Scenario: UI tests

- **WHEN** the client test suite runs
- **THEN** the route, menu, and table assertions run through Testing Library rather than Enzyme
