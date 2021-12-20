import { makeNamedError } from '../../make-named-error';
import { NotFoundError } from './not-found';

/**
 * Represents a failure to locate a specific item or resource, optionally
 * represented by a class instance (e.g. ObjectId from mongodb).
 */
export class ItemNotFoundError<T = unknown> extends NotFoundError {
  constructor(public readonly ref?: T, message?: string) {
    super(
      message ?? ref
        ? `${
            typeof ref == 'object'
              ? (ref as unknown as object)?.constructor?.name ?? 'item'
              : 'item'
          } "${ref}" was not found`
        : 'item was not found'
    );
  }
}
makeNamedError(ItemNotFoundError, 'ItemNotFoundError');
