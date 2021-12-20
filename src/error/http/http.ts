import { makeNamedError } from '../../make-named-error';
import { AppError } from '../app';

import type { ServerResponse } from 'http';

/**
 * Represents a generic HTTP or related failure.
 */
export class HttpError extends AppError {
  constructor(public readonly res?: ServerResponse, error?: string, message?: string) {
    super(
      message ?? res
        ? `[HTTP ${res?.statusCode}] ${error ?? res?.statusMessage ?? 'operation failed'}`
        : 'HTTP operation failed'
    );
  }
}
makeNamedError(HttpError, 'HttpError');
