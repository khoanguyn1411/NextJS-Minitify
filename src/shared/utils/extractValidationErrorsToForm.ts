import { type UseFormSetError } from "react-hook-form";

import {
  type AppError,
  isValidationError,
  type ValidationError,
} from "@/core/models/errors";

import { assertNonNull } from "./assertNonNull";

export function extractValidationErrorsToForm<
  T extends Record<string, unknown>,
  E extends Record<string, unknown> = Record<string, unknown>,
>(result: E | ValidationError<T> | AppError, setError: UseFormSetError<T>) {
  if (isValidationError<T>(result)) {
    assertNonNull(result.errors);
    result.errors.forEach((error) => {
      setError(error.field, { message: error.detail });
    });
  }
}