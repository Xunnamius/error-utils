import { AnyClass } from '@ergodark/types'

/**
 * Defines a special `name` property on an error class that improves DX.
 */
export function makeNamedError(ErrorClass: AnyClass, name: string) {
    Object.defineProperty(ErrorClass, 'name', { value: name });
    Object.defineProperty(ErrorClass.prototype, 'name', { value: name });
}

export class AppError extends Error {}

makeNamedError(AppError, 'AppError');

export class GuruMeditationError extends AppError {
    constructor(message?: string) {
        super(message ?? 'an impossible scenario occurred');
    }
}

makeNamedError(GuruMeditationError, 'GuruMeditationError');

export class HookError extends AppError {
    constructor(message?: string) {
        super(message ?? 'hook execution failed');
    }
}

makeNamedError(HookError, 'HookError');

export class FetchError extends AppError {
    constructor(res: Response, error?: string) {
        super(`${res.status} ${ error ?? res.statusText ?? 'fetch operation failed' }`);
    }
}

makeNamedError(FetchError, 'FetchError');

export class NotAuthorizedError extends AppError {
    constructor(message?: string) {
        super(message ?? 'not authorized');
    }
}

makeNamedError(NotAuthorizedError, 'NotAuthorizedError');

export class NotFoundError<T=string> extends AppError {
    constructor(reference?: T) {
        super('item ' + (reference ? `"${reference}"` : 'or resource') + ' was not found');
    }
}

makeNamedError(NotFoundError, 'NotFoundError');

export class KeyError extends AppError {
    constructor() {
        super('bad key encountered');
    }
}

makeNamedError(KeyError, 'KeyError');

/**
 * An alias of KeyError.
 */
export const KeyTypeError = KeyError;

export class ValidationError extends AppError {
    constructor(message?: string) {
        super(message ?? 'validation failed');
    }
}

makeNamedError(ValidationError, 'ValidationError');
