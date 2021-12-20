import { makeNamedError } from '../../make-named-error';
import { ValidationError } from './validation';

/**
 * Represents a user-provided misconfiguration.
 */
export class InvalidConfigurationError extends ValidationError {
  constructor(public readonly details?: string, message?: string) {
    super(message ?? 'invalid configuration' + (details ? `: ${details}` : ''));
  }
}
makeNamedError(InvalidConfigurationError, 'InvalidConfigurationError');
