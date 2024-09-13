import { type UseFormSetError } from "react-hook-form";

import { isAppError, isValidationError } from "@/core/models/errors";

import { assertNonNull } from "../utils/assertNonNull";
import { useNotify } from "./useNotify";

type HandleValidationErrorParams<T extends Record<string, unknown>> = {
  readonly result: unknown;
  readonly setError: UseFormSetError<T>;
};

export function useError() {
  const { notify } = useNotify();

  const extractErrorsToForm = <T extends Record<string, unknown>>({
    result,
    setError,
  }: HandleValidationErrorParams<T>) => {
    if (isValidationError<T>(result)) {
      assertNonNull(result.errors);
      result.errors.forEach((error) => {
        setError(error.field, { message: error.detail });
      });
    }
  };

  const notifyOnAppError = <T extends Record<string, unknown>>(
    result: HandleValidationErrorParams<T>["result"],
  ) => {
    if (isAppError(result)) {
      notify(result.detail, { type: "error" });
    }
  };

  const isPlainResult = <
    T extends Record<string, unknown>,
    E extends Record<string, unknown> = Record<string, unknown>,
  >(
    result: HandleValidationErrorParams<T>["result"],
  ): result is E => {
    return !isAppError(result) && result != null;
  };

  return { extractErrorsToForm, notifyOnAppError, isPlainResult };
}
