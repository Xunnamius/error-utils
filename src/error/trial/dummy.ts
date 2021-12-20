import { makeNamedError } from '../../make-named-error';
import { TrialError } from './trial';

/**
 * Represents a generic pseudo-error meant to be thrown, caught, and consumed
 * during testing (e.g. Jest) to verify error handling behavior.
 *
 * **This class MUST NEVER appear in production code.**
 */
export class DummyError extends TrialError {}
makeNamedError(DummyError, 'DummyError');
