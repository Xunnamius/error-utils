import { makeNamedError } from '../../make-named-error';
import { NotFoundError } from './not-found';

/**
 * Represents a failure to locate a specific item or resource, optionally
 * represented by a string literal `name` or the item's constructor name.
 */
export class ItemNotFoundError<T = unknown> extends NotFoundError {
  /**
   * Represents a failure to locate a specific item or resource, optionally
   * represented by a string literal `name` or the item's constructor name.
   */
  constructor(item?: T, itemName?: string);
  /**
   * This constructor syntax is used by subclasses when calling this constructor
   * via `super`.
   */
  constructor(item: T, itemName: string, message: string);
  constructor(
    public readonly item: T | undefined,
    public readonly itemName: string | undefined,
    message: string | undefined = undefined
  ) {
    if (!itemName) {
      itemName =
        typeof item == 'object'
          ? (item as unknown as object)?.constructor?.name ?? 'item'
          : 'item';
    }

    super(
      message ?? (item ? `${itemName} "${item}" was not found` : 'item was not found')
    );
  }
}
makeNamedError(ItemNotFoundError, 'ItemNotFoundError');
