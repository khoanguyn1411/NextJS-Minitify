import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

import { type ISong, getSongs } from "@/core/apis/songApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { useToggleExecutionState } from "@/shared/hooks/useToggleExecutionState";
import { useUpdateEffect } from "@/shared/hooks/useUpdateEffect";
export function useInfinitiveSongData() {
  const [options, setOptions] = useState<readonly ISong[]>([]);
  const [isLoading, toggleExecutionState] = useToggleExecutionState();
  const [searchValue, setSearchValue] = useState("");
  const [hasNext, setHasNext] = useState(true);
  const [pageNumber, setPageNumber] = useState<number>(
    BaseFilterParams.initialPagination.pageNumber,
  );

  const [debounceSearch] = useDebounceValue(searchValue, 300);

  const fetchPage = async (filters: BaseFilterParams.Combined) => {
    toggleExecutionState(async () => {
      if (!hasNext) {
        return;
      }
      const result = await getSongs({
        ...BaseFilterParams.initialPagination,
        pageNumber: pageNumber,
        search: filters.search,
      });
      const newOptions = result.items;
      setHasNext(result.hasNext);
      setOptions((prev) => [...prev, ...newOptions]);
    });
  };

  const fetchPageWithSearch = async (filters: BaseFilterParams.Combined) => {
    toggleExecutionState(async () => {
      const result = await getSongs(filters);
      const newOptions = result.items;
      setHasNext(result.hasNext);
      setOptions(newOptions);
      setPageNumber(BaseFilterParams.initialPagination.pageNumber);
    });
  };

  useUpdateEffect(() => {
    fetchPage({
      ...BaseFilterParams.initialPagination,
      pageNumber,
      search: searchValue,
    });
  }, [pageNumber]);

  useEffect(() => {
    fetchPageWithSearch({
      ...BaseFilterParams.initialPagination,
      search: debounceSearch,
    });
  }, [debounceSearch]);

  const onLoadMore = () => {
    setPageNumber((prev) => prev + 1);
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
