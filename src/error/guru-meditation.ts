import { makeNamedError } from '../make-named-error';
import { AppError } from './index';

/**
 * Represents a sanity check failure and/or the occurrence of an "impossible"
 * condition.
 */
export class GuruMeditationError extends AppError {
  constructor(message?: string) {
    super(message ?? 'an impossible scenario occurred');
  }
}
makeNamedError(GuruMeditationError, 'GuruMeditationError');
