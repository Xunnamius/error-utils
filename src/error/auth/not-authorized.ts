import { ErrorMessage } from '../../messages';
import { makeNamedError } from '../../make-named-error';
import { AuthError } from './auth';

/**
 * Represents a failure to authorize.
 */
export class NotAuthorizedError extends AuthError {
  constructor(message?: string) {
    super(message ?? ErrorMessage.NotAuthorized());
  }
}
makeNamedError(NotAuthorizedError, 'NotAuthorizedError');
