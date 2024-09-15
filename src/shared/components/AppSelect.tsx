import classNames from "classnames";
import { type FC, useMemo, useState } from "react";
import Select from "react-select";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

type SelectOption = {
  readonly value: string;
  readonly label: string;
};

const options: readonly SelectOption[] = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

// This ensures that Emotion's styles are inserted before Tailwind's
// styles so that Tailwind classes have precedence over Emotion
const EmotionCacheProvider = ({ children }: { children: React.ReactNode }) => {
  const cache = useMemo(
    () =>
      createCache({
        key: "with-tailwind",
        insertionPoint: document.querySelector("meta")!,
      }),
    [],
  );

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};

export const AppSelect: FC = () => {
  const [selectedOption, setSelectedOption] = useState<readonly SelectOption[]>(
    [],
  );

  return (
    <EmotionCacheProvider>
      <Select
        isMulti
        classNames={{
          control: ({ isFocused }) =>
            classNames(
              "border rounded-md",
              isFocused ? "bg-primary-400" : "bg-primary-300",
            ),
        }}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </EmotionCacheProvider>
  );
};
