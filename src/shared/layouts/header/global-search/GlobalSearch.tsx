import { Autocomplete, AutocompleteItem, User } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useState, type FC } from "react";
import { BiSearch } from "react-icons/bi";

import { useInfinitiveSongData } from "./useInfinitiveSongData";

export const GlobalSearch: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <>
      <Autocomplete
        inputValue={searchValue}
        onInputChange={setSearchValue}
        scrollRef={scrollerRef}
        isLoading={isLoading}
        items={options}
        onOpenChange={setIsOpen}
        startContent={<BiSearch />}
        placeholder="What do you want to listen?"
      >
        {(option) => (
          <AutocompleteItem key={option.id}>
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
