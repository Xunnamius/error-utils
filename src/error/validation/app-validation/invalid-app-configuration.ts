import { ErrorMessage } from '../../../messages';
import { makeNamedError } from '../../../make-named-error';
import { AppValidationError } from './app-validation';

/**
 * Represents an application misconfiguration outside the user's control.
 */
export class InvalidAppConfigurationError extends AppValidationError {
  /**
   * Represents an application misconfiguration outside the user's control.
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
    super(message ?? ErrorMessage.InvalidAppConfiguration(details));
  }
}
makeNamedError(InvalidAppConfigurationError, 'InvalidAppConfigurationError');
