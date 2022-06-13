import { ErrorMessage } from '../../../messages';
import { makeNamedError } from '../../../make-named-error';
import { ClientValidationError } from './client-validation';

/**
 * Represents encountering invalid or illegal credentials, key material, some
 * token, or other secret data provided by the user.
 */
export class InvalidSecretError extends ClientValidationError {
  /**
   * Represents encountering invalid or illegal credentials, key material, some
   * token, or other secret data provided by the user.
   */
  constructor(secretType?: string);
  /**
   * This constructor syntax is used by subclasses when calling this constructor
   * via `super`.
   */
  constructor(secretType: string, message: string);
  constructor(
    public readonly secretType: string,
    message: string | undefined = undefined
  ) {
    super(message ?? ErrorMessage.InvalidSecret(secretType));
  }
}
makeNamedError(InvalidSecretError, 'InvalidSecretError');
