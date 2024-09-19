"use client";

import { Card } from "@nextui-org/react";
import classNames from "classnames";
import Select, { type MultiValue } from "react-select";

import {
  type AllowedSelectOptionValue,
  type SelectOption,
} from "@/core/models/selectOption";

import { FormItem } from "../FormItem";
import {
  useFetchAutocomplete,
  type SelectConfig,
} from "./useFetchAutocomplete";

type Props<TOption, TData extends AllowedSelectOptionValue> = {
  readonly placeholder: string;
  readonly config: SelectConfig<TOption, TData>;
  readonly errorMessage?: string;
  readonly label?: string;
  readonly value: SelectOption<TData>[];
  readonly onChange: (value: MultiValue<SelectOption<TData>>) => void;
};

export const AppMultipleSelect = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TOption extends Record<string, any>,
  TData extends AllowedSelectOptionValue,
>({
  placeholder,
  config,
  value,
  label,
  onChange,
  errorMessage,
}: Props<TOption, TData>) => {
  const { options, setPageNumber, isLoading, setSearch } =
    useFetchAutocomplete(config);

  const onInputChange = (search: string) => {
    setSearch(search);
  };

  const onLoadMore = () => {
    setPageNumber((prev) => prev + 1);
  };

  // const MultiValue = (props: MultiValueGenericProps<SelectOption>) => {
  //   return <div {...props}>{props.data.value}</div>;
  // };

  return (
    <FormItem error={errorMessage}>
      <Card className="bg-input pb-2">
        <p className="px-container text-sm pt-2">{label}</p>
        <Select
          isMulti
          value={value}
          options={options}
          menuPortalTarget={document.body}
          menuPlacement="auto"
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
