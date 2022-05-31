import { ErrorMessage } from '../../messages';
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
  constructor(error?: string);
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
    public readonly res: ServerResponseLike | string | undefined,
    error = '',
    message: string | undefined = undefined
  ) {
    const resIsString = typeof res == 'string';

    if (message) {
      super(message);
    } else if (!res || resIsString) {
      if (error || resIsString) {
        super(ErrorMessage.HttpFailure(resIsString ? res : error));
      } else {
        super(ErrorMessage.HttpFailure());
      }
    } else {
      super(
        ErrorMessage.HttpSubFailure(
          error || (isResponseShapeA(res) ? res.statusMessage : res.statusText) || null,
          isResponseShapeA(res) ? res.statusCode : res.status
        )
      );
    }
  }
}
makeNamedError(HttpError, 'HttpError');
