/**
 * Defines a special `name` property on an error class that improves DX.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeNamedError(ErrorClass: new (...args: any[]) => Error, name: string) {
  Object.defineProperty(ErrorClass, 'name', { value: name });
  Object.defineProperty(ErrorClass.prototype, 'name', { value: name });
}
