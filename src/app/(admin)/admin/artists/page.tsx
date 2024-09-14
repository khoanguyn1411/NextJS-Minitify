"use client";

import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/react";

import { ArtistCreationModal } from "@/shared/components/admin/ArtistCreationModal";
import { ArtistTable } from "@/shared/components/admin/ArtistTable";

export default function Page() {
  const disclosure = useDisclosure();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 justify-between items-center">
        <h1 className="text-xl font-semibold">Artists</h1>
        <Button onClick={disclosure.onOpen} color="primary">
          Add new artist
        </Button>
        <ArtistCreationModal {...disclosure} />
      </div>
      <ArtistTable />
    </div>
  );
}
