import * as e from '../src/index';
import { ErrorMessage } from '../src/index';
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
      ErrorMessage.GuruMeditation()
    );

    expect(() => toss(new e.GuruMeditationError('x'))).toThrow('x');
  });
});

describe('::AuthError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.AuthError())).toThrow(ErrorMessage.AuthFailure());
    expect(() => toss(new e.AuthError('x'))).toThrow('x');
  });
});

describe('::NotAuthenticatedError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.NotAuthenticatedError())).toThrow(
      ErrorMessage.NotAuthenticated()
    );
    expect(() => toss(new e.NotAuthenticatedError('x'))).toThrow('x');
  });
});

describe('::NotAuthorizedError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.NotAuthorizedError())).toThrow(ErrorMessage.NotAuthorized());
    expect(() => toss(new e.NotAuthorizedError('x'))).toThrow('x');
    expect(() => toss(new e.NotAuthorizedError('x'))).toThrow('x');
  });
});

describe('::HttpError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.HttpError())).toThrow(ErrorMessage.HttpFailure());
    expect(() => toss(new e.HttpError('bad bad not good'))).toThrow(
      'HTTP failure: bad bad not good'
    );

    expect(() => toss(new e.HttpError(undefined, 'bad bad not good'))).toThrow(
      'HTTP failure: bad bad not good'
    );

    expect(() => toss(new e.HttpError({ statusCode: 500, statusMessage: '' }))).toThrow(
      ErrorMessage.HttpSubFailure(null, 500)
    );

    expect(() => toss(new e.HttpError({ status: 500, statusText: '' }))).toThrow(
      ErrorMessage.HttpSubFailure(null, 500)
    );

    expect(() =>
      toss(
        new e.HttpError({
          statusCode: 500,
          statusMessage: 'x'
        })
      )
    ).toThrow(ErrorMessage.HttpSubFailure('x', 500));

    expect(() =>
      toss(
        new e.HttpError({
          status: 500,
          statusText: 'x'
        })
      )
    ).toThrow(ErrorMessage.HttpSubFailure('x', 500));

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
    ).toThrow(ErrorMessage.HttpSubFailure('condition', 500));

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
    ).toThrow(ErrorMessage.HttpSubFailure('condition', 500));

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

    expect(() => toss(new e.NotFoundError())).toThrow(ErrorMessage.NotFound());
    expect(() => toss(new e.NotFoundError('x'))).toThrow('x');
  });
});

describe('::ItemsNotFoundError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.ItemsNotFoundError())).toThrow(
      ErrorMessage.ItemOrItemsNotFound('items')
    );

    expect(() => toss(new e.ItemsNotFoundError('x'))).toThrow(
      ErrorMessage.ItemOrItemsNotFound('x')
    );

    expect(() =>
      toss(new e.ItemsNotFoundError({ constructor: undefined, toString: () => 'x' }))
    ).toThrow(ErrorMessage.ItemOrItemsNotFound('x items'));

    expect(() =>
      toss(new e.ItemsNotFoundError({ constructor: { name: 'X' }, toString: () => 'x' }))
    ).toThrow(ErrorMessage.ItemOrItemsNotFound('X items'));

    expect(() => toss(new e.ItemsNotFoundError('x', 'y'))).toThrow('y');
  });

  it('exposes expected public properties', async () => {
    expect.hasAssertions();

    expect(new e.ItemsNotFoundError('a', 'x')).toHaveProperty('itemOrName', 'a');
  });
});

describe('::ItemNotFoundError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.ItemNotFoundError())).toThrow(
      ErrorMessage.ItemNotFound(undefined, 'item')
    );

    expect(() => toss(new e.ItemNotFoundError('x'))).toThrow(
      ErrorMessage.ItemNotFound('x', 'item')
    );

    expect(() =>
      toss(new e.ItemNotFoundError({ constructor: undefined, toString: () => 'x' }))
    ).toThrow(ErrorMessage.ItemNotFound('x', 'item'));

    expect(() =>
      toss(new e.ItemNotFoundError({ constructor: { name: 'X' }, toString: () => 'x' }))
    ).toThrow(ErrorMessage.ItemNotFound('x', 'X'));

    expect(() =>
      toss(
        new e.ItemNotFoundError({ constructor: { name: 'X' }, toString: () => 'x' }, 'y')
      )
    ).toThrow(ErrorMessage.ItemNotFound('x', 'y'));

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

    expect(() => toss(new e.ValidationError())).toThrow(ErrorMessage.ValidationFailure());
    expect(() => toss(new e.ValidationError('x'))).toThrow('x');
  });
});

describe('::AppValidationError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.AppValidationError())).toThrow(
      ErrorMessage.AppValidationFailure()
    );
    expect(() => toss(new e.AppValidationError('x'))).toThrow('x');
  });
});

describe('::InvalidAppConfigurationError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.InvalidAppConfigurationError())).toThrow(
      ErrorMessage.InvalidAppConfiguration()
    );

    expect(() => toss(new e.InvalidAppConfigurationError('x'))).toThrow(
      ErrorMessage.InvalidAppConfiguration('x')
    );

    expect(() => toss(new e.InvalidAppConfigurationError('x', 'z'))).toThrow('z');
  });

  it('exposes expected public properties', async () => {
    expect.hasAssertions();

    expect(new e.InvalidAppConfigurationError('a', 'x')).toHaveProperty('details', 'a');
  });
});

describe('::InvalidAppEnvironmentError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.InvalidAppEnvironmentError())).toThrow(
      ErrorMessage.InvalidAppEnvironment()
    );

    expect(() => toss(new e.InvalidAppEnvironmentError('x'))).toThrow(
      ErrorMessage.InvalidAppEnvironment('x')
    );

    expect(() => toss(new e.InvalidAppEnvironmentError('x', 'z'))).toThrow('z');
  });

  it('exposes expected public properties', async () => {
    expect.hasAssertions();

    expect(new e.InvalidAppEnvironmentError('a', 'x')).toHaveProperty('details', 'a');
  });
});

describe('::ClientValidationError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.ClientValidationError())).toThrow(
      ErrorMessage.ClientValidationFailure()
    );
    expect(() => toss(new e.ClientValidationError('x'))).toThrow('x');
  });
});

describe('::InvalidClientConfigurationError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.InvalidClientConfigurationError())).toThrow(
      ErrorMessage.InvalidClientConfiguration()
    );

    expect(() => toss(new e.InvalidClientConfigurationError('x'))).toThrow(
      ErrorMessage.InvalidClientConfiguration('x')
    );

    expect(() => toss(new e.InvalidClientConfigurationError('x', 'z'))).toThrow('z');
  });

  it('exposes expected public properties', async () => {
    expect.hasAssertions();

    expect(new e.InvalidClientConfigurationError('a', 'x')).toHaveProperty(
      'details',
      'a'
    );
  });
});

describe('::InvalidItemError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.InvalidItemError())).toThrow(
      ErrorMessage.InvalidItem(undefined, 'item')
    );

    expect(() => toss(new e.InvalidItemError('x'))).toThrow(
      ErrorMessage.InvalidItem('x', 'item')
    );

    expect(() => toss(new e.InvalidItemError('x', 'y'))).toThrow(
      ErrorMessage.InvalidItem('x', 'y')
    );

    expect(() => toss(new e.InvalidItemError('a', 'x', 'y'))).toThrow('y');
  });

  it('exposes expected public properties', async () => {
    expect.hasAssertions();

    expect(new e.InvalidItemError('a', 'x', 'y')).toHaveProperty('item', 'a');
    expect(new e.InvalidItemError('a', 'x', 'y')).toHaveProperty('itemName', 'x');
    expect(new e.InvalidItemError()).toHaveProperty('itemName', 'item');
  });
});

describe('::InvalidSecretError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.InvalidSecretError())).toThrow(
      ErrorMessage.InvalidSecret('secret')
    );

    expect(() => toss(new e.InvalidSecretError('bearer token'))).toThrow(
      ErrorMessage.InvalidSecret('bearer token')
    );

    expect(() => toss(new e.InvalidSecretError('bearer token', 'x'))).toThrow('x');
  });

  it('exposes expected public properties', async () => {
    expect.hasAssertions();

    expect(new e.InvalidSecretError('bearer token')).toHaveProperty(
      'secretType',
      'bearer token'
    );
  });
});

describe('::NotImplementedError', () => {
  it('instantiates as expected', () => {
    expect.hasAssertions();

    expect(() => toss(new e.NotImplementedError())).toThrow(
      ErrorMessage.NotImplemented()
    );

    expect(() => toss(new e.NotImplementedError('x'))).toThrow('x');
  });
});
