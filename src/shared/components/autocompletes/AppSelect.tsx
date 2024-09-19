import { Card } from "@nextui-org/react";
import classNames from "classnames";
import Select, { type SingleValue } from "react-select";

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
  readonly value: SelectOption<TData> | null;
  readonly onChange: (value: SingleValue<SelectOption<TData> | null>) => void;
};

export const AppSelect = <
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
  const { isLoading, options, setPageNumber, setSearch } =
    useFetchAutocomplete(config);

  const onLoadMore = () => {
    setPageNumber((prev) => prev + 1);
  };

  const onInputChange = (newInputValue: string) => {
    setSearch(newInputValue);
  };

  return (
    <FormItem error={errorMessage}>
      <Card className="bg-input pb-2">
        <p className="px-container text-sm pt-2">{label}</p>
        <Select
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
            valueContainer: () => "!pl-3",
            singleValue: () => "!text-white",
          }}
          onChange={onChange}
        />
      </Card>
    </FormItem>
  );
};
