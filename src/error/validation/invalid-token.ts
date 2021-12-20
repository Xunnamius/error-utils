import { makeNamedError } from '../../make-named-error';
import { ValidationError } from './validation';

/**
 * Represents encountering invalid or illegal credentials, key material, some
 * token, or other sensitive data.
 */
export class InvalidTokenError extends ValidationError {
  constructor() {
    super('invalid token');
  }
}
makeNamedError(InvalidTokenError, 'InvalidTokenError');
