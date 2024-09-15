"use client";

import { Input } from "@nextui-org/react";
import { useEffect, useState, type ChangeEvent, type FC } from "react";
import { BiSearch } from "react-icons/bi";
import { useDebounceValue } from "usehooks-ts";

import { useAppQueryParams } from "@/shared/hooks/useAppQueryParams";

export const ArtistInputSearch: FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const { mergeQueryParams } = useAppQueryParams();
  const [searchDebounced] = useDebounceValue(searchValue, 300);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    mergeQueryParams({ search: searchDebounced });
  }, [searchDebounced]);

  return (
    <Input
      type="search"
      onChange={handleInputChange}
      startContent={<BiSearch />}
      placeholder="Search artist"
      className="w-2/3"
    />
  );
};
