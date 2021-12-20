import { makeNamedError } from '../../make-named-error';
import { AppError } from '../app';

/**
 * Represents a generic validation failure.
 */
export class ValidationError extends AppError {
  constructor(message?: string) {
    super(message ?? 'validation failed');
  }
}
makeNamedError(ValidationError, 'ValidationError');
