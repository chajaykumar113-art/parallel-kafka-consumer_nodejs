// A TypeScript CommonJS user: types must resolve
import { ParallelConsumerError } from 'parallel-kafka-consumer';

export const err: Error = new ParallelConsumerError('boom', { cause: 1 });
