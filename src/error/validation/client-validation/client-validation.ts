import { ErrorMessage } from '../../../messages';
import { makeNamedError } from '../../../make-named-error';
import { ValidationError } from '../validation';

/**
 * Represents a generic validation failure due to user error.
 */
export class ClientValidationError extends ValidationError {
  constructor(message?: string) {
    super(message ?? ErrorMessage.ClientValidationFailure());
  }
}
makeNamedError(ClientValidationError, 'ClientValidationError');
