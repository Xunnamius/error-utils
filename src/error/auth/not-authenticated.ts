import { ErrorMessage } from '../../messages';
import { makeNamedError } from '../../make-named-error';
import { AuthError } from './auth';

/**
 * Represents a failure to authenticate.
 */
export class NotAuthenticatedError extends AuthError {
  constructor(message?: string) {
    super(message ?? ErrorMessage.NotAuthenticated());
  }
}
makeNamedError(NotAuthenticatedError, 'NotAuthenticatedError');
