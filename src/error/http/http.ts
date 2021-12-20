import { makeNamedError } from '../../make-named-error';
import { AppError } from '../app';

type ResponseShapeA = { statusCode: number; statusMessage: string };
type ResponseShapeB = { status: number; statusText: string };
type ServerResponseLike = ResponseShapeA | ResponseShapeB;

const isResponseShapeA = (o: ServerResponseLike): o is ResponseShapeA => {
  const res = o as ResponseShapeA;
  return res.statusCode !== undefined && res.statusMessage !== undefined;
};

/**
 * Represents a generic HTTP or related failure.
 */
export class HttpError extends AppError {
  /**
   * Represents a generic HTTP or related failure.
   */
  constructor(res?: ServerResponseLike, error?: string);
  /**
   * This constructor syntax is used by subclasses when calling this constructor
   * via `super`.
   */
  constructor(res: ServerResponseLike, error: string, message: string);
  constructor(
    public readonly res: ServerResponseLike | undefined,
    error: string | undefined,
    message: string | undefined = undefined
  ) {
    if (message) {
      super(message);
    } else if (!res) {
      super('HTTP sub-request failed mysteriously');
    } else {
      super(
        `${
          error ||
          (isResponseShapeA(res) ? res.statusMessage : res.statusText) ||
          'sub-request failed'
        } [HTTP ${isResponseShapeA(res) ? res.statusCode : res.status}]`
      );
    }
  }
}
makeNamedError(HttpError, 'HttpError');
