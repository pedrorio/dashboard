# Design

## Context

See proposal.md. The compose file publishes nginx on port 4000 and does not publish the client or API ports. The client calls `/api/...` on the same origin, and the webpack dev server has no proxy for that prefix.

## Goals / Non-Goals

**Goals:**

- One page a reviewer can follow without reading the sagas first.
- State the Node 12 constraint that `node-sass` 4.13.1 imposes.

**Non-Goals:**

- Documenting secret values or the AWS account.
- A second docs site.

## Decisions

- Describe `takeLatest` as cancelling the previous worker of that action, which is what stops a stale page response from landing.
- Tell readers that `yarn start:dev` in the client does not proxy `/api`, and that compose nginx does.

## Risks / Trade-offs

- [The README will drift] → The living `project-documentation` spec only requires the topics, not a sentence-level copy of the file.
