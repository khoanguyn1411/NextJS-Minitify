"use client";

import { Card } from "@nextui-org/react";
import classNames from "classnames";
import { useEffect, useState } from "react";
import Select, { type MultiValue } from "react-select";
import { useDebounceValue } from "usehooks-ts";

import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { type Pagination } from "@/core/models/pagination";
import {
  type AllowedSelectOptionValue,
  type SelectOption,
} from "@/core/models/selectOption";

import { useToggleExecutionState } from "../hooks/useToggleExecutionState";
import { FormItem } from "./FormItem";

export type SelectConfig<T, E extends AllowedSelectOptionValue> = {
  readonly toReadable: (item: T) => string;
  readonly toOption: (item: T) => SelectOption<E>;
  readonly fetchApi: (
    filters: BaseFilterParams.Combined,
  ) => Promise<Pagination<T>>;
};

type Props<T, E extends AllowedSelectOptionValue> = {
  readonly placeholder: string;
  readonly config: SelectConfig<T, E>;
  readonly errorMessage?: string;
  readonly value: SelectOption<E>[];
  readonly onChange: (value: MultiValue<SelectOption<E>>) => void;
};

export const AppSelect = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TOption extends Record<string, any>,
  TData extends AllowedSelectOptionValue,
>({
  placeholder,
  config,
  value,
  onChange,
  errorMessage,
}: Props<TOption, TData>) => {
  const [options, setOptions] = useState<readonly SelectOption<TData>[]>([]);
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

  // const MultiValue = (props: MultiValueGenericProps<SelectOption>) => {
  //   return <div {...props}>{props.data.value}</div>;
  // };

  useEffect(() => {
    fetchApi({
      ...BaseFilterParams.initialPagination,
      pageNumber,
      search,
    });
  }, [debouncedSearch, pageNumber]);

  return (
    <FormItem error={errorMessage}>
      <Card className="bg-input pb-2">
        <p className="px-container text-sm pt-2">Artists</p>
        <Select
          isMulti
          value={value}
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
          onChange={onChange}
        />
      </Card>
    </FormItem>
  );
};
