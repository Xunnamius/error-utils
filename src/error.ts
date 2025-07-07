/**
 * A collection of possible error and warning messages.
 */
/* istanbul ignore next */
export const ErrorMessage = {
  MissingPrototype(name: string) {
    return `cannot create named error "${name}": corresponding class is missing a prototype`;
  },
  MissingSuperKind(name: string) {
    return `cannot create named error "${name}": the ${name} class must extend from another named error or Error`;
  }
};
