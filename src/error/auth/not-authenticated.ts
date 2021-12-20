import { makeNamedError } from '../../make-named-error';
import { AuthError } from './auth';

/**
 * Represents a failure to authenticate.
 */
export class NotAuthenticatedError extends AuthError {
  constructor(message?: string) {
    super(message ?? 'not authenticated');
  }
}
makeNamedError(NotAuthenticatedError, 'NotAuthenticatedError');
