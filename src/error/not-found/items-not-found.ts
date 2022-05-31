import { ErrorMessage } from '../../messages';
import { makeNamedError } from '../../make-named-error';
import { NotFoundError } from './not-found';

type Serializable = { toString: () => string };

/**
 * Represents a failure to locate one or more items or resources
 * represented by a string literal `item` or the item's constructor name.
 */
export class ItemsNotFoundError<T = unknown> extends NotFoundError {
  /**
   * Represents a failure to locate one or more items or resources
   * represented by a string literal `item` or the item's constructor name.
   */
  constructor(itemOrName?: T);
  /**
   * This constructor syntax is used by subclasses when calling this constructor
   * via `super`.
   */
  constructor(itemOrName: T, message: string);
  constructor(
    public readonly itemOrName: T | undefined,
    message: string | undefined = undefined
  ) {
    let itemsName = '';

    if (typeof itemOrName == 'object') {
      const name = (itemOrName as unknown as object)?.constructor?.name;
      if (name) {
        itemsName = `${name} items`;
      }
    }

    if (!itemsName) {
      itemsName = (itemOrName as Serializable)?.toString
        ? typeof itemOrName == 'string'
          ? itemOrName
          : `${(itemOrName as Serializable).toString()} items`
        : 'items';
    }

    super(message ?? ErrorMessage.ItemOrItemsNotFound(itemsName));
  }
}
makeNamedError(ItemsNotFoundError, 'ItemsNotFoundError');
