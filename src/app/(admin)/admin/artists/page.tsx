"use client";

import { Button } from "@nextui-org/button";
import { Input, useDisclosure } from "@nextui-org/react";
import { type ChangeEvent, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDebounceValue } from "usehooks-ts";

import { ArtistCreationModal } from "@/shared/components/admin/ArtistCreationModal";
import { ArtistsTable } from "@/shared/components/admin/artistTable/ArtistsTable";

export default function Page() {
  const disclosure = useDisclosure();
  const [searchValue, setSearchValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const [searchDebounced] = useDebounceValue(searchValue, 300);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 justify-between items-center">
        <h1 className="text-xl font-semibold">Artists</h1>
        <div className="flex gap-4">
          <Input
            type="search"
            onChange={handleInputChange}
            startContent={<BiSearch />}
            placeholder="Search artist"
            className="w-2/3"
          />
          <Button onClick={disclosure.onOpen} color="primary">
            Add new artist
          </Button>
        </div>
        <ArtistCreationModal {...disclosure} />
      </div>
      <ArtistsTable searchValue={searchDebounced} />
    </div>
  );
}
