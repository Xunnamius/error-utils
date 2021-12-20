import { makeNamedError } from '../../make-named-error';
import { ValidationError } from './validation';

/**
 * Represents a misconfigured runtime environment.
 */
export class InvalidEnvironmentError extends ValidationError {
  /**
   * Represents a misconfigured runtime environment.
   */
  constructor(details?: string);
  /**
   * This constructor syntax is used by subclasses when calling this constructor
   * via `super`.
   */
  constructor(details: string, message: string);
  constructor(public readonly details: string, message: string | undefined = undefined) {
    super(message ?? 'invalid runtime environment' + (details ? `: ${details}` : ''));
  }
}
makeNamedError(InvalidEnvironmentError, 'InvalidEnvironmentError');
