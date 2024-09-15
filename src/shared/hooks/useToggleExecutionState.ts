import { useState } from "react";

import { useError } from "./useError";

export const useToggleExecutionState = <T>(): [
  boolean,
  (callback: () => Promise<T>, onError?: () => void) => Promise<T>,
] => {
  const [isLoading, setIsLoading] = useState(false);
  const { notifyOnAppError } = useError();
  async function toggleExecutionState<T>(
    callback: () => Promise<T>,
    onError?: () => void,
  ): Promise<T> {
    try {
      setIsLoading(true);
      return await callback();
    } catch (e) {
      if (onError != null) {
        onError();
      }
      notifyOnAppError(e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  }
  return [isLoading, toggleExecutionState];
};
