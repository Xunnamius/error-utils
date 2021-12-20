import { makeNamedError } from '../../make-named-error';
import { AppError } from '../app';

/**
 * Represents a failure to locate an item or resource.
 */
export class NotFoundError extends AppError {
  constructor(message?: string) {
    super(message ?? 'item or resource was not found');
  }
}
makeNamedError(NotFoundError, 'NotFoundError');
