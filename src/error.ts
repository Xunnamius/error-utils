/**
 * A collection of possible error and warning messages.
 */
/* istanbul ignore next */
export const ErrorMessage = {
  MissingPrototype(name: string) {
    return `cannot create named error "${name}": provided class is missing a prototype`;
  },
  MissingSuperKind(name: string) {
    return `cannot create named error "${name}": provided class must extend from another "named error" or Error`;
  }
};
