import { ErrorMessage } from '../../../messages';
import { makeNamedError } from '../../../make-named-error';
import { ValidationError } from '../validation';

/**
 * Represents a generic validation failure outside of the user's control.
 */
export class AppValidationError extends ValidationError {
  constructor(message?: string) {
    super(message ?? ErrorMessage.AppValidationFailure());
  }
}
makeNamedError(AppValidationError, 'AppValidationError');
