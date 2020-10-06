import { AppError, makeNamedError } from '../src/index'

describe('named-errors', () => {
    describe('::makeNamedError', () => {
        it('turns an error class into a named error class', () => {
            expect.hasAssertions();
            const C = class C extends AppError {};
            makeNamedError(C, 'X');

            expect((new C('d')).toString()).toStrictEqual('X: d');
        });
    });
});
