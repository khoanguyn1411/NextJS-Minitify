import { type NonNullableFields } from "./types/nonNullableFields";

/**
 * Type-assertion for non-nullable types.
 * @param value Value to assert.
 * @param message Optional message to display.
 */
export function assertNonNull<T>(value: T, message?: string): asserts value is NonNullable<T> {
  if (value == null) {
    throw new Error(message ?? 'Unexpected null.');
  }
}

/**
 * Asserts non-nullable fields in an object.
 * @param object Object to assert non-nullable fields in.
 * @param keys Keys to assert.
 *
 * @example
 * ```ts
 * const teamMemberData: TeamMemberCreationData = assertNonNullFields(
 *   form.value, // Partial<TeamMemberCreationData>
 *   'email',
 *   'firstName',
 *   'lastName',
 *   'phoneNumber',
 *   'profession',
 *   'territories',
 * )
 *
 * ```
 */
export function assertNonNullableFieldsWithReturn<
  T extends Record<string, unknown>,
  K extends keyof T,
>(object: T, ...keys: K[]): NonNullableFields<T, K> {
  keys.forEach(key => assertNonNull(object[key]));
  return object as unknown as NonNullableFields<T, K>;
}
