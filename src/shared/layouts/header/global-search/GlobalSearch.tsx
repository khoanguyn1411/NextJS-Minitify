import { Autocomplete, AutocompleteItem, User } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useState, type FC } from "react";
import { BiSearch } from "react-icons/bi";

import { usePlayingSongStore } from "@/shared/stores/usePlayingSongStore";

import { useInfinitiveSongData } from "./useInfinitiveSongData";

export const GlobalSearch: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setPlayingSong } = usePlayingSongStore();

  // We need this to trigger the click event of autocomplete. Not sure why.
  const [value, setValue] = useState<string | number | null>(null);
  const {
    options,
    hasNext,
    isLoading,
    setSearchValue,
    onLoadMore,
    searchValue,
  } = useInfinitiveSongData();

  const [, scrollerRef] = useInfiniteScroll({
    hasMore: hasNext,
    isEnabled: isOpen,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore,
  });

  const handleSelectionChange = (value: string | number | null) => {
    setValue(value);
    const selectedOption = options.find(
      (option) => option.id.toString() === value,
    );
    if (selectedOption == null) {
      return;
    }
    setPlayingSong(selectedOption);
  };

  return (
    <>
      <Autocomplete
        inputValue={searchValue}
        onInputChange={setSearchValue}
        scrollRef={scrollerRef}
        isLoading={isLoading}
        selectedKey={value}
        onSelectionChange={handleSelectionChange}
        items={options}
        onOpenChange={setIsOpen}
        startContent={<BiSearch />}
        placeholder="What do you want to listen?"
      >
        {(option) => (
          <AutocompleteItem
            onClick={() => {
              setPlayingSong(option);
            }}
            key={option.id}
          >
            <User
              avatarProps={{ src: option.imageUrl }}
              name={option.name}
              description={option.artists
                .map((artist) => artist.name)
                .join(", ")}
            />
          </AutocompleteItem>
        )}
      </Autocomplete>
    </>
  );
};
