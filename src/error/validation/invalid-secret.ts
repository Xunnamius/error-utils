import { makeNamedError } from '../../make-named-error';
import { ValidationError } from './validation';

/**
 * Represents encountering invalid or illegal credentials, key material, some
 * token, or other secret data.
 */
export class InvalidSecretError extends ValidationError {
  /**
   * Represents encountering invalid or illegal credentials, key material, some
   * token, or other secret data.
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
    super(message ?? `invalid ${secretType ?? 'secret'}`);
  }
}
makeNamedError(InvalidSecretError, 'InvalidSecretError');
