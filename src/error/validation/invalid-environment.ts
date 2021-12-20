import { makeNamedError } from '../../make-named-error';
import { ValidationError } from './validation';

/**
 * Represents a misconfigured runtime environment.
 */
export class InvalidEnvironmentError extends ValidationError {
  constructor(public readonly details?: string, message?: string) {
    super(message ?? 'invalid runtime environment' + (details ? `: ${details}` : ''));
  }
}
makeNamedError(InvalidEnvironmentError, 'InvalidEnvironmentError');
