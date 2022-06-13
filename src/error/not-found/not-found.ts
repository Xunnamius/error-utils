import { makeNamedError } from '../../make-named-error';
import { ErrorMessage } from '../../messages';
import { AppError } from '../app';

/**
 * Represents a failure to locate an item or resource.
 */
export class NotFoundError extends AppError {
  /**
   * Represents a failure to locate an item or resource.
   */
  constructor(message?: string) {
    super(message ?? ErrorMessage.NotFound());
  }
}
makeNamedError(NotFoundError, 'NotFoundError');
