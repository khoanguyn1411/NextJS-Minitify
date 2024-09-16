import { Card } from "@nextui-org/react";
import classNames from "classnames";
import debounce from "lodash.debounce";
import { useState } from "react";
import Select from "react-select/async";

import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { type Pagination } from "@/core/models/pagination";

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
  const [options, setSelectedOptions] = useState<readonly SelectOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<readonly SelectOption[]>(
    [],
  );

  const fetchApi = async (
    inputValue: string,
    callback: (options: SelectOption[]) => void,
  ) => {
    const result = await config.fetchApi({
      ...BaseFilterParams.initialPagination,
      search: inputValue,
    });
    const options = result.items.map((item) => config.toOption(item));
    callback(options);
  };

  const debouncedFetchApi = debounce(fetchApi, 300);

  const loadOptions = (
    inputValue: string,
    callback: (options: SelectOption[]) => void,
  ) => {
    debouncedFetchApi(inputValue, callback);
  };

  return (
    <Card className="bg-input pb-2">
      <p className="px-container text-sm pt-2">Artists</p>
      <Select
        isMulti
        loadOptions={loadOptions}
        menuPortalTarget={document.body}
        defaultOptions
        cacheOptions
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
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </Card>
  );
};
