import { ErrorMessage } from '../messages';
import { makeNamedError } from '../make-named-error';
import { AppError } from './index';

/**
 * Represents a sanity check failure and/or the occurrence of an "impossible"
 * condition.
 */
export class GuruMeditationError extends AppError {
  /**
   * Represents a sanity check failure and/or the occurrence of an "impossible"
   * condition.
   */
  constructor(message?: string) {
    super(message ?? ErrorMessage.GuruMeditation());
  }
}
makeNamedError(GuruMeditationError, 'GuruMeditationError');
