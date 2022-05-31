import { ErrorMessage } from '../messages';
import { makeNamedError } from '../make-named-error';
import { AppError } from './index';

/**
 * Represents running into temporarily unimplemented functionality.
 */
export class NotImplementedError extends AppError {
  /**
   * Represents running into temporarily unimplemented functionality.
   */
  constructor(message?: string) {
    super(message ?? ErrorMessage.NotImplemented());
  }
}
makeNamedError(NotImplementedError, 'NotImplementedError');
