import { makeNamedError } from '../../make-named-error';
import { AppError } from '../app';

import type { ServerResponse } from 'http';

/**
 * Represents a generic HTTP or related failure.
 */
export class HttpError extends AppError {
  /**
   * Represents a generic HTTP or related failure.
   */
  constructor(res?: ServerResponse, error?: string);
  /**
   * This constructor syntax is used by subclasses when calling this constructor
   * via `super`.
   */
  constructor(res: ServerResponse, error: string, message: string);
  constructor(
    public readonly res: ServerResponse,
    error: string,
    message: string | undefined = undefined
  ) {
    super(
      message ??
        (res
          ? `[HTTP ${res?.statusCode}] ${
              error ?? res?.statusMessage ?? 'operation failed'
            }`
          : 'HTTP operation failed')
    );
  }
}
makeNamedError(HttpError, 'HttpError');
