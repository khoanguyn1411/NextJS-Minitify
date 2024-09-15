"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import { type FC } from "react";

import { SongCreationModal } from "./SongCreationModal";

export const SongCreationButton: FC = () => {
  const disclosure = useDisclosure();

  return (
    <>
      <Button onClick={disclosure.onOpen} color="primary">
        Add new artist
      </Button>
      <SongCreationModal {...disclosure} />
    </>
  );
};
