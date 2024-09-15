"use client";

import { Input } from "@nextui-org/react";
import { useEffect, useState, type ChangeEvent, type FC } from "react";
import { BiSearch } from "react-icons/bi";
import { useDebounceValue } from "usehooks-ts";

import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { useAppQueryParams } from "@/shared/hooks/useAppQueryParams";

type Props = {
  readonly initialFilter: string;
};

export const TableSearch: FC<Props> = ({ initialFilter }) => {
  const [searchValue, setSearchValue] = useState<string>(initialFilter);
  const { mergeQueryParams } = useAppQueryParams();
  const [searchDebounced] = useDebounceValue(searchValue, 300);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    mergeQueryParams({
      pageNumber: BaseFilterParams.initialPagination.pageNumber.toString(),
      search: searchDebounced,
    });
  }, [searchDebounced]);

  return (
    <Input
      type="search"
      value={searchValue}
      onChange={handleInputChange}
      startContent={<BiSearch />}
      placeholder="Search artist"
      className="w-2/3"
    />
  );
};
