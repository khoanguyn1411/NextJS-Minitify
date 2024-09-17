import { z } from "zod";

/**
 * Creates a schema for an option in a select component.
 * @param valueSchema Value schema to use for the option.
 */
export function createSelectOptionSchema<
  T extends z.ZodNumber | z.ZodString | z.ZodBoolean,
>(valueSchema: T) {
  return z.object({
    value: valueSchema,
    label: z.string(),
  });
}

export type AllowedSelectOptionValue = number | string | boolean | null;

/** Select option. */
export interface SelectOption<T extends AllowedSelectOptionValue> {
  /** Value. */
  readonly value: T;

  /** Label. */
  readonly label: string;
}
