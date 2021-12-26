import { makeNamedError } from '../make-named-error';
import { AppError } from './index';

/**
 * Represents running into temporarily unimplemented functionality.
 */
export class NotImplementedError extends AppError {
  constructor(message?: string) {
    super(message ?? 'attempted to invoke unimplemented functionality');
  }
}
makeNamedError(NotImplementedError, 'NotImplementedError');
