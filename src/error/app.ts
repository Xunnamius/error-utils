import { makeNamedError } from '../make-named-error';

/**
 * Represents a generic application exception.
 */
export class AppError extends Error {}
makeNamedError(AppError, 'AppError');
