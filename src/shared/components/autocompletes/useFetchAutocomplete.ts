import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { type Pagination } from "@/core/models/pagination";
import {
  type AllowedSelectOptionValue,
  type SelectOption,
} from "@/core/models/selectOption";
import { useUpdateEffect } from "@/shared/hooks/useUpdateEffect";

import { useToggleExecutionState } from "../../hooks/useToggleExecutionState";

export type SelectConfig<TOption, TData extends AllowedSelectOptionValue> = {
  readonly toReadable: (item: TOption) => string;
  readonly toKey: (item: TOption) => string | number;
  readonly toOption: (item: TOption) => SelectOption<TData>;
  readonly fetchApi: (
    filters: BaseFilterParams.Combined,
  ) => Promise<Pagination<TOption>>;
};

export const useFetchAutocomplete = <
  TOption,
  TData extends AllowedSelectOptionValue,
>(
  params: SelectConfig<TOption, TData>,
) => {
  const [options, setOptions] = useState<readonly SelectOption<TData>[]>([]);
  const [isLoading, toggleExecutionState] = useToggleExecutionState();
  const [hasNext, setHasNext] = useState(true);
  const [pageNumber, setPageNumber] = useState<number>(
    BaseFilterParams.initialPagination.pageNumber,
  );
  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebounceValue(search, 300);

  const fetchApi = async (filters: BaseFilterParams.Combined) => {
    toggleExecutionState(async () => {
      if (!hasNext) {
        return;
      }
      const result = await params.fetchApi({
        ...BaseFilterParams.initialPagination,
        pageNumber: pageNumber,
        search: filters.search,
      });
      const newOptions = result.items.map((item) => params.toOption(item));
      setHasNext(result.hasNext);
      setOptions((prev) => [...prev, ...newOptions]);
    });
  };

  const fetchApiWithSearch = async (filters: BaseFilterParams.Combined) => {
    toggleExecutionState(async () => {
      const result = await params.fetchApi(filters);
      const newOptions = result.items.map((item) => params.toOption(item));
      setHasNext(result.hasNext);
      setOptions(newOptions);
      setPageNumber(BaseFilterParams.initialPagination.pageNumber);
    });
  };

  useUpdateEffect(() => {
    fetchApi({
      ...BaseFilterParams.initialPagination,
      pageNumber,
      search,
    });
  }, [pageNumber]);

  useEffect(() => {
    fetchApiWithSearch({
      ...BaseFilterParams.initialPagination,
      search: debouncedSearch,
    });
  }, [debouncedSearch]);

  return {
    isLoading,
    options,
    setPageNumber,
    setSearch,
    hasNext,
  };
};
