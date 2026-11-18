// A CommonJS user: require()
const assert = require('node:assert/strict');
const { ParallelConsumerError } = require('parallel-kafka-consumer');

const err = new ParallelConsumerError('boom');
assert.ok(err instanceof Error);
assert.equal(err.name, 'ParallelConsumerError');

// Internal files must stay private.
assert.throws(() => require('parallel-kafka-consumer/dist/errors.js'), {
  code: 'ERR_PACKAGE_PATH_NOT_EXPORTED',
});
