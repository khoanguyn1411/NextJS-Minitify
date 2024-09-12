import { type UseFormSetError } from "react-hook-form";

import {
  isValidationError,
  type ValidationError,
} from "@/core/models/validation-error";

import { assertNonNull } from "./assertNonNull";

export function extractValidationErrorsToForm<
  T extends Record<string, unknown>,
  E extends Record<string, unknown> = Record<string, unknown>,
>(result: E | ValidationError<T>, setError: UseFormSetError<T>) {
  if (isValidationError<T>(result)) {
    assertNonNull(result.errors);
    result.errors.forEach((error) => {
      setError(error.field, { message: error.detail });
    });
  }
}
