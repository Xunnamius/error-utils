import { ErrorMessage } from '../../../messages';
import { makeNamedError } from '../../../make-named-error';
import { ClientValidationError } from './client-validation';

/**
 * Represents a user-provided misconfiguration.
 */
export class InvalidClientConfigurationError extends ClientValidationError {
  /**
   * Represents a user-provided misconfiguration.
   */
  constructor(details?: string);
  /**
   * This constructor syntax is used by subclasses when calling this constructor
   * via `super`.
   */
  constructor(details: string, message: string);
  constructor(
    public readonly details: string | undefined,
    message: string | undefined = undefined
  ) {
    super(message ?? ErrorMessage.InvalidClientConfiguration(details));
  }
}
makeNamedError(InvalidClientConfigurationError, 'InvalidClientConfigurationError');
