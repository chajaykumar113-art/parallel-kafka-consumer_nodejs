/**
 * Base class for every error thrown by parallel-kafka-consumer.
 *
 * Catch this to handle any library error in one place:
 *
 * ```ts
 * try { ... } catch (err) {
 *   if (err instanceof ParallelConsumerError) { ... }
 * }
 * ```
 */
export class ParallelConsumerError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'ParallelConsumerError';
  }
}
