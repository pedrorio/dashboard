# Spec Delta

## Purpose

Give a reviewer one place that explains the explorer, how a stale page request is dropped, and how to run, test, and build it.

## ADDED Requirements

### Requirement: The repository explains itself

The repository SHALL include a root README that describes what the explorer shows, the action, reducer, saga, and service flow, how `takeLatest` drops a stale page request, how to run, test, and build both packages, and where the living specs, open proposals, and archived changes live.

#### Scenario: A reviewer opens the repository

- **WHEN** a reviewer opens the root README
- **THEN** it covers the explorer, the request flow including `takeLatest`, run, test, build, and the OpenSpec directories
