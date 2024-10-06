import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

import { type ISong, getSongs } from "@/core/apis/songApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { useToggleExecutionState } from "@/shared/hooks/useToggleExecutionState";
export function useInfinitiveSongData() {
  const [options, setOptions] = useState<readonly ISong[]>([]);
  const [isLoading, toggleExecutionState] = useToggleExecutionState();
  const [searchValue, setSearchValue] = useState("");
  const [hasNext, setHasNext] = useState(true);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const [debounceSearch] = useDebounceValue(searchValue, 300);

  const loadOptions = async (
    pageNumber: number,
    search: string,
    shouldReset: boolean,
  ) => {
    toggleExecutionState(async () => {
      if (!hasNext) {
        return;
      }
      const result = await getSongs({
        ...BaseFilterParams.initialPagination,
        pageNumber: pageNumber,
        search: search,
      });
      setHasNext(result.hasNext);
      if (shouldReset) {
        setOptions(result.items);
        return;
      }
      setOptions((prev) => [...prev, ...result.items]);
    });
  };

  useEffect(() => {
    loadOptions(
      BaseFilterParams.initialPagination.pageNumber,
      debounceSearch,
      true,
    );
  }, [debounceSearch]);

  const onLoadMore = () => {
    const newPage = pageNumber + 1;
    setPageNumber(newPage);
    loadOptions(newPage, "", false);
  };

  return {
    options,
    hasNext,
    isLoading,
    searchValue,
    onLoadMore,
    setSearchValue,
  };
}
