import { makeNamedError } from '../../make-named-error';
import { AppError } from '../app';

/**
 * Represents a generic failure that occurred during testing (e.g. with Jest).
 */
export class TrialError extends AppError {}
makeNamedError(TrialError, 'TrialError');
