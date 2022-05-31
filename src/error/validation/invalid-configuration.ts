import { ErrorMessage } from '../../messages';
import { makeNamedError } from '../../make-named-error';
import { ValidationError } from './validation';

/**
 * Represents a user-provided misconfiguration.
 */
export class InvalidConfigurationError extends ValidationError {
  /**
   * Represents a user-provided misconfiguration.
   */
  constructor(details?: string);
  /**
   * This constructor syntax is used by subclasses when calling this constructor
   * via `super`.
   */
  constructor(details: string, message: string);
  constructor(public readonly details: string, message: string | undefined = undefined) {
    super(message ?? ErrorMessage.InvalidConfiguration(details));
  }
}
makeNamedError(InvalidConfigurationError, 'InvalidConfigurationError');
