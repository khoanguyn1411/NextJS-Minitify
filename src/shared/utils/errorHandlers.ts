import { type FieldValues } from "react-hook-form";
import { type ZodType } from "zod";

import {
  ERROR_CODES,
  type ApiError,
  type AppError,
  type ValidationError,
} from "@/core/models/errors";

type Params<T, E> = {
  readonly schema: ZodType<T>;
  readonly data: T;
  readonly onPassed: (data: T) => E | AppError;
};

export function buildAppError(detail: string): AppError {
  return {
    type: ERROR_CODES.INVALID_DATA,
    detail,
  };
}

export function validateWithSchema<T extends FieldValues, E>({
  schema,
  onPassed,
  data,
}: Params<T, E>): E | ValidationError<T> | AppError {
  const parsedData = schema.safeParse(data);
  if (parsedData.success) {
    try {
      return onPassed(parsedData.data);
    } catch (error: unknown) {
      const castedError = error as { message: string | undefined };
      return {
        type: ERROR_CODES.SERVER,
        detail: castedError?.message ?? JSON.stringify(error),
      };
    }
  }
  return {
    type: ERROR_CODES.VALIDATION,
    detail: "Invalid data",
    errors: parsedData.error.errors.map(
      (e) => ({ detail: e.message, field: e.path.join(".") }) as ApiError<T>
    ),
  };
}
