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
    expect(() => toss(new e.NotAuthorizedError('x'))).toThrow('x');
  });
});

describe('::HttpError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.HttpError())).toThrow('HTTP failure');
    expect(() => toss(new e.HttpError('bad bad not good'))).toThrow(
      'HTTP failure: bad bad not good'
    );

    expect(() => toss(new e.HttpError(undefined, 'bad bad not good'))).toThrow(
      'HTTP failure: bad bad not good'
    );

    expect(() => toss(new e.HttpError({ statusCode: 500, statusMessage: '' }))).toThrow(
      'sub-request failed [HTTP 500]'
    );

    expect(() => toss(new e.HttpError({ status: 500, statusText: '' }))).toThrow(
      'sub-request failed [HTTP 500]'
    );

    expect(() =>
      toss(
        new e.HttpError({
          statusCode: 500,
          statusMessage: 'x'
        })
      )
    ).toThrow('x [HTTP 500]');

    expect(() =>
      toss(
        new e.HttpError({
          status: 500,
          statusText: 'x'
        })
      )
    ).toThrow('x [HTTP 500]');

    expect(() =>
      toss(
        new e.HttpError(
          {
            statusCode: 500,
            statusMessage: 'y'
          },
          'condition'
        )
      )
    ).toThrow('condition [HTTP 500]');

    expect(() =>
      toss(
        new e.HttpError(
          {
            status: 500,
            statusText: 'x'
          },
          'condition'
        )
      )
    ).toThrow('condition [HTTP 500]');

    expect(() =>
      toss(
        new e.HttpError(
          {
            statusCode: 500,
            statusMessage: 'x'
          },
          'condition',
          'z'
        )
      )
    ).toThrow('z');
  });

  it('exposes expected public properties', async () => {
    expect.hasAssertions();

    const res = {
      status: 500,
      statusText: 'x'
    };

    expect(new e.HttpError(res, 'x', 'y')).toHaveProperty('res', res);
  });

  it('works with ServerResponse type (type check)', async () => {
    expect.assertions(0);

    const res = { statusCode: 500, statusMessage: '' } as unknown as ServerResponse;
    new e.HttpError(res);
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

    expect(() =>
      toss(
        new e.ItemNotFoundError({ constructor: { name: 'X' }, toString: () => 'x' }, 'y')
      )
    ).toThrow('y "x" was not found');

    expect(() => toss(new e.ItemNotFoundError('x', 'y', 'z'))).toThrow('z');
  });

  it('exposes expected public properties', async () => {
    expect.hasAssertions();

    expect(new e.ItemNotFoundError('a', 'x', 'y')).toHaveProperty('item', 'a');
    expect(new e.ItemNotFoundError('a', 'x', 'y')).toHaveProperty('itemName', 'x');
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

    expect(() => toss(new e.InvalidConfigurationError('x', 'z'))).toThrow('z');
  });

  it('exposes expected public properties', async () => {
    expect.hasAssertions();

    expect(new e.InvalidConfigurationError('a', 'x')).toHaveProperty('details', 'a');
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

    expect(() => toss(new e.InvalidEnvironmentError('x', 'z'))).toThrow('z');
  });

  it('exposes expected public properties', async () => {
    expect.hasAssertions();

    expect(new e.InvalidEnvironmentError('a', 'x')).toHaveProperty('details', 'a');
  });
});

describe('::InvalidItemError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.InvalidItemError())).toThrow('invalid id');
    expect(() => toss(new e.InvalidItemError('x'))).toThrow('invalid id "x"');
    expect(() => toss(new e.InvalidItemError('x', 'y'))).toThrow('invalid y "x"');
    expect(() => toss(new e.InvalidItemError('a', 'x', 'y'))).toThrow('y');
  });

  it('exposes expected public properties', async () => {
    expect.hasAssertions();

    expect(new e.InvalidItemError('a', 'x', 'y')).toHaveProperty('item', 'a');
    expect(new e.InvalidItemError('a', 'x', 'y')).toHaveProperty('itemName', 'x');
    expect(new e.InvalidItemError()).toHaveProperty('itemName', 'id');
  });
});

describe('::InvalidSecretError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.InvalidSecretError())).toThrow('invalid secret');
    expect(() => toss(new e.InvalidSecretError('bearer token', 'x'))).toThrow('x');
    expect(() => toss(new e.InvalidSecretError('bearer token'))).toThrow(
      'invalid bearer token'
    );
  });

  it('exposes expected public properties', async () => {
    expect.hasAssertions();

    expect(new e.InvalidSecretError('bearer token')).toHaveProperty(
      'secretType',
      'bearer token'
    );
  });
});
