import { makeNamedError } from '../../make-named-error';
import { ValidationError } from './validation';

/**
 * Represents encountering an invalid item (usually an identifier).
 */
export class InvalidItemError<T = undefined> extends ValidationError {
  /**
   * Represents encountering an invalid item (usually an identifier).
   */
  constructor(item?: T, itemName?: string);
  /**
   * This constructor syntax is used by subclasses when calling this constructor
   * via `super`.
   */
  constructor(item: T, itemName: string, message: string);
  constructor(
    public readonly item: T | undefined,
    public readonly itemName = 'id',
    message: string | undefined = undefined
  ) {
    super(message ?? `invalid ${itemName}${item ? ` "${item}"` : ''}`);
  }
}
makeNamedError(InvalidItemError, 'InvalidItemError');
