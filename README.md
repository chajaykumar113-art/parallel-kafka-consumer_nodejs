# parallel-kafka-consumer

Key-ordered parallel Kafka consumer for Node.js. Process many messages of one partition at once, keep order per key, and commit only the safe offset.

thsi the mainroot file structure we wil follow
Status: early design. Not usable yet.

## Project layout

```
src/
  core/          engine: per-key queues, scheduling, safe offset tracking
  adapters/      bindings to Kafka clients (KafkaJS, Confluent JS, Platformatic)
test/
  unit/          fast tests of the core, no Kafka needed
  integration/   tests against a real Kafka cluster

examples/        runnable usage examples

docs/            design notes
```
