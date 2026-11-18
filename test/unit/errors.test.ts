import { describe, expect, it } from 'vitest';
import { ParallelConsumerError } from '../../src/errors.js';

describe('ParallelConsumerError', () => {
  it('is a real Error with our name and message', () => {
    const err = new ParallelConsumerError('boom');

    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(ParallelConsumerError);
    expect(err.name).toBe('ParallelConsumerError');
    expect(err.message).toBe('boom');
  });

  it('keeps the original error as cause', () => {
    const original = new Error('broker down');
    const err = new ParallelConsumerError('commit failed', { cause: original });

    expect(err.cause).toBe(original);
  });
});
