# parallel-kafka-consumer

Key-ordered parallel Kafka consumer for Node.js. Process many messages of one partition at once, keep order per key, and commit only the safe offset.

Status: early development. Not usable yet.

## Project layout

```
src/
  index.ts       public API (the only entry point users can import)
  errors.ts      error classes
  core/          engine: per-key queues, scheduling, safe offset tracking (no Kafka client code)
  adapters/      bindings to Kafka clients (KafkaJS first; Confluent JS, Platformatic later)
test/
  unit/          fast tests of the core, no Kafka needed
  integration/   tests against a real Kafka cluster
examples/        runnable usage examples
docs/
  adr/           architecture decision records
```

## Development

Requires Node.js 22 or newer.

```bash
npm install            # installs dev tools and the commit-message hook
npm run typecheck      # TypeScript checks, no output
npm run build          # builds dist/ (ESM + CommonJS + type definitions)
npm run check:package  # publint + arethetypeswrong on the packed package
```

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org) (`feat:`, `fix:`, `docs:`, `chore:` ...). A commit hook checks them, and release-please uses them to write the changelog and pick the next version.
