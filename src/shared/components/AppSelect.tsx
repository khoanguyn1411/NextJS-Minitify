import classNames from "classnames";
import { type FC, useState } from "react";
import Select from "react-select";

type SelectOption = {
  readonly value: string;
  readonly label: string;
};

const options: readonly SelectOption[] = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

export const AppSelect: FC = () => {
  const [selectedOption, setSelectedOption] = useState<readonly SelectOption[]>(
    [],
  );

  return (
    <Select
      isMulti
      menuPortalTarget={document.body}
      className="z-[90]"
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
      }}
      defaultValue={selectedOption}
      onChange={setSelectedOption}
      options={options}
    />
  );
};
