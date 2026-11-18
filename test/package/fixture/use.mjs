// An ESM user: import
import assert from 'node:assert/strict';
import { ParallelConsumerError } from 'parallel-kafka-consumer';

const err = new ParallelConsumerError('boom');
assert.ok(err instanceof Error);
assert.equal(err.name, 'ParallelConsumerError');
