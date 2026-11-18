# 0001. Ship both ESM and CommonJS (dual output)

## Status

Accepted

## Context

Users add this library to an existing KafkaJS consumer. KafkaJS is a CommonJS package,
and many of the backends that use it are CommonJS (`require`). Newer backends use ESM
(`import`). TypeScript projects still on `moduleResolution: "node"` cannot load an
ESM-only package at all.

## Decision

- Source is TypeScript in `src/`. `tsup` builds two outputs from it:
  `dist/index.js` (ESM) and `dist/index.cjs` (CommonJS), each with its own types
  (`index.d.ts`, `index.d.cts`).
- `package.json` has `"type": "module"` and an `exports` map with `import` and
  `require` conditions, `types` listed first in each.
- `main` and `types` point to the CommonJS build for old tools that ignore `exports`.
- Only `src/index.ts` is public. `exports` blocks deep imports into `dist/`.

## Consequences

- Every user gets a working import, whatever their module system.
- The library must not depend on module identity across the two builds
  (dual package hazard): no module-level shared state that both builds would need.
- Before every release: `npm run check:package` (publint + arethetypeswrong) must pass.
