import { Card } from "@nextui-org/react";
import classNames from "classnames";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useDebounceValue } from "usehooks-ts";

import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { type Pagination } from "@/core/models/pagination";

import { useToggleExecutionState } from "../hooks/useToggleExecutionState";

type SelectOption = {
  readonly value: string | number;
  readonly label: string;
};

export type SelectConfig<T> = {
  readonly toReadable: (item: T) => string;
  readonly toOption: (item: T) => SelectOption;
  readonly fetchApi: (
    filters: BaseFilterParams.Combined,
  ) => Promise<Pagination<T>>;
};

type Props<T> = {
  readonly placeholder: string;
  readonly config: SelectConfig<T>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppSelect = <TData extends Record<string, any>>({
  placeholder,
  config,
}: Props<TData>) => {
  const [options, setOptions] = useState<readonly SelectOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<
    readonly SelectOption[]
  >([]);
  const [hasNext, setHasNext] = useState(true);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [isLoading, toggleExecutionState] = useToggleExecutionState();
  const [search, setSearch] = useState("");

  const [debouncedSearch] = useDebounceValue(search, 300);

  const onInputChange = (search: string) => {
    setSearch(search);
  };

  const fetchApi = async (filters: BaseFilterParams.Combined) => {
    toggleExecutionState(async () => {
      if (!hasNext) {
        return;
      }
      const result = await config.fetchApi({
        ...BaseFilterParams.initialPagination,
        pageNumber: pageNumber,
        search: filters.search,
      });
      const newOptions = result.items.map((item) => config.toOption(item));
      setHasNext(result.hasNext);
      setOptions((prev) => [...prev, ...newOptions]);
    });
  };

  const onLoadMore = () => {
    setPageNumber((prev) => prev + 1);
  };

  useEffect(() => {
    fetchApi({
      ...BaseFilterParams.initialPagination,
      pageNumber,
      search,
    });
  }, [debouncedSearch, pageNumber]);

  return (
    <Card className="bg-input pb-2">
      <p className="px-container text-sm pt-2">Artists</p>
      <Select
        isMulti
        value={selectedOptions}
        options={options}
        menuPortalTarget={document.body}
        isLoading={isLoading}
        onInputChange={onInputChange}
        onMenuScrollToBottom={onLoadMore}
        placeholder={placeholder}
        classNames={{
          control: () =>
            classNames("!border-none !shadow-none !rounded-md !bg-input"),
          menu: () => classNames("!bg-input !rounded-md"),
          option: ({ isFocused }) =>
            classNames(
              "!bg-input !rounded-md !cursor-pointer",
              isFocused ? "!bg-input-hover" : "",
            ),
          input: () => classNames("!text-white"),
          menuPortal: () => "!z-[90]",
          multiValue: () => classNames("!rounded-md !bg-primary-50"),
          multiValueRemove: () =>
            classNames("!text-input hover:!bg-primary-100 hover:!rounded-md"),
          valueContainer: () => "!pl-3",
        }}
        onChange={setSelectedOptions}
        defaultValue={[]}
      />
    </Card>
  );
};
