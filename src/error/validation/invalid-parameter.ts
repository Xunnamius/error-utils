import { makeNamedError } from '../../make-named-error';
import { ValidationError } from './validation';

/**
 * Represents encountering invalid or illegal parameters/arguments.
 */
export class InvalidParameterError extends ValidationError {
  constructor(public readonly param?: string | string[], message?: string) {
    super(
      message ??
        `invalid parameter${
          Array.isArray(param)
            ? param.length
              ? `s: ${(param as string[]).join(', ')}`
              : 's'
            : param
            ? `: ${param}`
            : ''
        }`
    );
  }
}
makeNamedError(InvalidParameterError, 'InvalidParameterError');
