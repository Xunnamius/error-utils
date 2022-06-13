import { ErrorMessage } from '../../../messages';
import { makeNamedError } from '../../../make-named-error';
import { ClientValidationError } from './client-validation';

/**
 * Represents encountering an invalid item as the result of bad user input.
 */
export class InvalidItemError<T = undefined> extends ClientValidationError {
  /**
   * Represents encountering an invalid item as the result of bad user input.
   */
  constructor(item?: T, itemName?: string);
  /**
   * This constructor syntax is used by subclasses when calling this constructor
   * via `super`.
   */
  constructor(item: T, itemName: string, message: string);
  constructor(
    public readonly item: T | undefined,
    message: string | undefined = undefined
  ) {
    super(message ?? ErrorMessage.InvalidItem(item, itemName));
  }
}
makeNamedError(InvalidItemError, 'InvalidItemError');
