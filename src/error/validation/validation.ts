import { ErrorMessage } from '../../messages';
import { makeNamedError } from '../../make-named-error';
import { AppError } from '../app';

/**
 * Represents a generic validation failure.
 */
export class ValidationError extends AppError {
  constructor(message?: string) {
    super(message ?? ErrorMessage.ValidationFailure());
  }
}
makeNamedError(ValidationError, 'ValidationError');
