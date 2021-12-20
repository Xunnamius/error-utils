import { makeNamedError } from '../../make-named-error';
import { ValidationError } from './validation';

/**
 * Represents encountering an invalid or illegal identifier.
 */
export class InvalidIdError<T = undefined> extends ValidationError {
  constructor(public readonly id?: T, message?: string) {
    super(message ?? `invalid id${id ? ` "${id}"` : ''}`);
  }
}
makeNamedError(InvalidIdError, 'InvalidIdError');
