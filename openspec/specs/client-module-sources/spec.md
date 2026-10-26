# client-module-sources Specification

## Purpose
Keep each client module as one TypeScript source so the build and the tests cannot load a stale compiled copy.

## Requirements

### Requirement: TypeScript is the only copy of a client module

The client source tree SHALL contain each module as TypeScript and SHALL NOT contain a compiled JavaScript copy of that same module. The TypeScript compiler SHALL emit into `dist` rather than beside the source file.

#### Scenario: A module has both copies

- **WHEN** a TypeScript module is present under the client source tree
- **THEN** no compiled JavaScript file for that module is committed beside it

#### Scenario: Compiler emit

- **WHEN** the TypeScript compiler runs for the client
- **THEN** its output is written under `dist` and not beside the source file
