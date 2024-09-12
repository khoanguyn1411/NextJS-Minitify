import { type FieldPath, type FieldValues } from "react-hook-form";

/** Error returned by API. */
export type ApiError<T extends FieldValues> = {
  /** Error description.  */
  readonly detail: string;

  /** Key of error. */
  readonly field: FieldPath<T> | `root.${string}` | "root";
};

/** Validation error DTO. */
export type ValidationError<T extends FieldValues> = {
  
  /** Error type. */
  readonly type: string;

  /** Detail of error. */
  readonly detail: string;

  /** Errors. */
  readonly errors?: readonly ApiError<T>[];
};

/**
 * Is error a ValidationError.
 * @param error Some error.
 */
export function isValidationError<T extends FieldValues>(
  error: Record<string, unknown>,
): error is ValidationError<T> {
  return (error as ValidationError<T>).errors != null;
}
