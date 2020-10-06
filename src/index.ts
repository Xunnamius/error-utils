export class AppError extends Error {}

Object.defineProperty(AppError, 'name', { value: 'AppError' });

export class GuruMeditationError extends AppError {
    constructor(message?: string) {
        super(message ?? 'an impossible scenario occurred');
    }
}

Object.defineProperty(GuruMeditationError, 'name', { value: 'GuruMeditationError' });

export class HookError extends AppError {
    constructor(message?: string) {
        super(message ?? 'hook execution failed');
    }
}

Object.defineProperty(HookError, 'name', { value: 'HookError' });

export class FetchError extends AppError {
    constructor(res: Response, error?: string) {
        super(`${res.status} ${ error ?? res.statusText ?? 'fetch operation failed' }`);
    }
}

Object.defineProperty(FetchError, 'name', { value: 'FetchError' });

export class NotAuthorizedError extends AppError {
    constructor(message?: string) {
        super(message ?? 'not authorized');
    }
}

Object.defineProperty(NotAuthorizedError, 'name', { value: 'NotAuthorizedError' });

export class NotFoundError<T=string> extends AppError {
    constructor(reference?: T) {
        super('item ' + (reference ? `"${reference}"` : 'or resource') + ' was not found');
    }
}

Object.defineProperty(NotFoundError, 'name', { value: 'NotFoundError' });

export class KeyError extends AppError {
    constructor() {
        super('bad key encountered');
    }
}

Object.defineProperty(KeyError, 'name', { value: 'KeyError' });

/**
 * An alias of KeyError.
 */
export const KeyTypeError = KeyError;

export class ValidationError extends AppError {
    constructor(message?: string) {
        super(message ?? 'validation failed');
    }
}

Object.defineProperty(ValidationError, 'name', { value: 'ValidationError' });
