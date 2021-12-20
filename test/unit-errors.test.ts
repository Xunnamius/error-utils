import * as e from '../src/index';
import { toss } from 'toss-expression';

import type { ServerResponse } from 'http';

describe('::makeNamedError', () => {
  it('turns an error class into a named error class', async () => {
    expect.hasAssertions();

    const C = class C extends e.AppError {};
    e.makeNamedError(C, 'X');

    expect(new C('d').toString()).toBe('X: d');
  });
});

describe('::AppError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.AppError())).toThrow(/^$/);
    expect(() => toss(new e.AppError('x'))).toThrow('x');
  });
});

describe('::GuruMeditationError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.GuruMeditationError())).toThrow(
      'an impossible scenario occurred'
    );

    expect(() => toss(new e.GuruMeditationError('x'))).toThrow('x');
  });
});

describe('::AuthError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.AuthError())).toThrow('auth failed');
    expect(() => toss(new e.AuthError('x'))).toThrow('x');
  });
});

describe('::NotAuthenticatedError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.NotAuthenticatedError())).toThrow('not authenticated');
    expect(() => toss(new e.NotAuthenticatedError('x'))).toThrow('x');
  });
});

describe('::NotAuthorizedError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.NotAuthorizedError())).toThrow('not authorized');
    expect(() => toss(new e.NotAuthorizedError('x'))).toThrow('x');
  });
});

describe('::HttpError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.HttpError())).toThrow('HTTP operation failed');

    expect(() =>
      toss(new e.HttpError({ statusCode: 500 } as unknown as ServerResponse))
    ).toThrow('[HTTP 500] operation failed');

    expect(() =>
      toss(
        new e.HttpError({
          statusCode: 500,
          statusMessage: 'x'
        } as unknown as ServerResponse)
      )
    ).toThrow('[HTTP 500] x');
  });
});

describe('::NotFoundError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.NotFoundError())).toThrow('item or resource was not found');
    expect(() => toss(new e.NotFoundError('x'))).toThrow('x');
  });
});

describe('::ItemNotFoundError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.ItemNotFoundError())).toThrow('item was not found');
    expect(() => toss(new e.ItemNotFoundError('x'))).toThrow('item "x" was not found');

    expect(() =>
      toss(new e.ItemNotFoundError({ constructor: undefined, toString: () => 'x' }))
    ).toThrow('item "x" was not found');

    expect(() =>
      toss(new e.ItemNotFoundError({ constructor: { name: 'X' }, toString: () => 'x' }))
    ).toThrow('X "x" was not found');
  });
});

describe('::TrialError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.TrialError())).toThrow(/^$/);
    expect(() => toss(new e.TrialError('x'))).toThrow('x');
  });
});

describe('::DummyError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.DummyError())).toThrow(/^$/);
    expect(() => toss(new e.DummyError('x'))).toThrow('x');
  });
});

describe('::ValidationError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.ValidationError())).toThrow('validation failed');
    expect(() => toss(new e.ValidationError('x'))).toThrow('x');
  });
});

describe('::InvalidConfigurationError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.InvalidConfigurationError())).toThrow(
      'invalid configuration'
    );

    expect(() => toss(new e.InvalidConfigurationError('x'))).toThrow(
      'invalid configuration: x'
    );
  });
});

describe('::InvalidEnvironmentError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.InvalidEnvironmentError())).toThrow(
      'invalid runtime environment'
    );

    expect(() => toss(new e.InvalidEnvironmentError('x'))).toThrow(
      'invalid runtime environment: x'
    );
  });
});

describe('::InvalidIdError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.InvalidIdError())).toThrow('invalid id');
    expect(() => toss(new e.InvalidIdError('x'))).toThrow('invalid id "x"');
  });
});

describe('::InvalidParameterError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.InvalidParameterError())).toThrow('invalid parameter');
    expect(() => toss(new e.InvalidParameterError('x'))).toThrow('invalid parameter: x');

    expect(() => toss(new e.InvalidParameterError(['x', 'y']))).toThrow(
      'invalid parameters: x, y'
    );

    expect(() => toss(new e.InvalidParameterError([]))).toThrow('invalid parameters');
    expect(() => toss(new e.InvalidParameterError(''))).toThrow('invalid parameter');
  });
});

describe('::InvalidTokenError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.InvalidTokenError())).toThrow('invalid token');
    // @ts-expect-error: InvalidTokenError should take no parameters
    expect(() => toss(new e.InvalidTokenError('leaked-secret'))).toThrow('invalid token');
  });
});
