import { type FieldPath, type FieldValues } from "react-hook-form";

export const ERROR_CODES = {
  SERVER: "server",
  VALIDATION: "validation",
  INVALID_DATA: "invalidData",
} as const;

/** Error returned by API. */
export type ApiError<T extends FieldValues> = {
  /** Error description.  */
  readonly detail: string;

  /** Key of error. */
  readonly field: FieldPath<T> | `root.${string}` | "root";
};

export type AppError = {
  /** Error type. */
  readonly type: string;

  /** Detail of error. */
  readonly detail: string;
};

/** Validation error DTO. */
export type ValidationError<T extends FieldValues> = AppError & {
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

/**
 * Is error a AppError.
 * @param error Some error.
 */
export function isAppError(error: unknown): error is AppError {
  return (error as AppError).detail != null && (error as AppError).type != null;
}
