# 0002. Use TypeScript 6 for type checking and builds

## Status

Accepted (revisit when tsup supports TypeScript 7)

## Context

TypeScript 7 is the native compiler and has no JavaScript API. tsup generates the
`.d.ts` files through that API, so the declaration build fails with TypeScript 7.

## Decision

Pin `typescript` to `^6` as a dev dependency.

## Consequences

- The type output is identical for users; this only affects our build.
- Revisit when tsup (or an alternative such as tsdown) supports TypeScript 7.
