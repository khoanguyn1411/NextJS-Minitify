import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useEffect, useState, type FC } from "react";
import { BiSearch } from "react-icons/bi";
import { useDebounceValue } from "usehooks-ts";

import { getSongs, type ISong } from "@/core/apis/songApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { useToggleExecutionState } from "@/shared/hooks/useToggleExecutionState";
import { useUpdateEffect } from "@/shared/hooks/useUpdateEffect";
export const GlobalSearch: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<readonly ISong[]>([]);
  const [isLoading, toggleExecutionState] = useToggleExecutionState();
  const [searchValue, setSearchValue] = useState("");
  const [hasNext, setHasNext] = useState(true);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const [searchDebounceValue] = useDebounceValue(searchValue, 300);

  const onLoadMore = () => {
    setPageNumber((prev) => prev + 1);
  };

  const [, scrollerRef] = useInfiniteScroll({
    hasMore: hasNext,
    isEnabled: isOpen,
    shouldUseLoader: true,
    onLoadMore,
  });

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
      setHasNext(result.hasNext);
      setOptions((prev) => [...prev, ...result.items]);
    });
  };

  const fetchPageWithSearch = async (filters: BaseFilterParams.Combined) => {
    toggleExecutionState(async () => {
      const result = await getSongs(filters);
      setHasNext(result.hasNext);
      setOptions(result.items);
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
      search: searchDebounceValue,
    });
  }, [searchDebounceValue]);

  return (
    <>
      <Autocomplete
        inputValue={searchValue}
        onInputChange={setSearchValue}
        scrollRef={scrollerRef}
        isLoading={isLoading}
        items={options}
        onChange={() => setIsOpen(true)}
        startContent={<BiSearch />}
        placeholder="What do you want to listen?"
      >
        {(option) => (
          <AutocompleteItem key={option.id}>{option.name}</AutocompleteItem>
        )}
      </Autocomplete>
    </>
  );
};
