import { ErrorMessage } from '../../../messages';
import { makeNamedError } from '../../../make-named-error';
import { AppValidationError } from './app-validation';

/**
 * Represents a misconfigured runtime environment outside of the user's control.
 */
export class InvalidAppEnvironmentError extends AppValidationError {
  /**
   * Represents a misconfigured runtime environment outside of the user's
   * control.
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
    super(message ?? ErrorMessage.InvalidAppEnvironment(details));
  }
}
makeNamedError(InvalidAppEnvironmentError, 'InvalidAppEnvironmentError');
