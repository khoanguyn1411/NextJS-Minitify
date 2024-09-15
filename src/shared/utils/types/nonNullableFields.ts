/**
 * Utility type that creates a new type with specified fields as non-nullable.
 * @returns A new type with specified fields as non-nullable.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NonNullableFields<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, any>,
  K extends keyof T,
> = Readonly<
  {
    [k in K]-?: NonNullable<T[k]>;
  } & {
    [k in Exclude<keyof T, K>]: T[k];
  }
>;
