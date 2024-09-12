import { type FieldValues } from "react-hook-form";
import { type ZodType } from "zod";

import {
  type ApiError,
  type ValidationError,
} from "@/core/models/validation-error";

type Params<T, E> = {
  readonly schema: ZodType<T>;
  readonly data: T;
  readonly onPassed: (data: T) => E;
};
export function validateWithSchema<T extends FieldValues, E>({
  schema,
  onPassed,
  data,
}: Params<T, E>): E | ValidationError<T> {
  const parsedData = schema.safeParse(data);
  if (parsedData.success) {
    return onPassed(parsedData.data);
  }
  return {
    type: "Validation",
    detail: "Invalid data",
    errors: parsedData.error.errors.map(
      (e) => ({ detail: e.message, field: e.path.join(".") } as ApiError<T>)
    ),
  };
}
