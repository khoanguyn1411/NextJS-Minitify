"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import { type FC } from "react";

import { AlbumCreationModal } from "./AlbumCreationModal";

export const AlbumCreationButton: FC = () => {
  const disclosure = useDisclosure();

  return (
    <>
      <Button onClick={disclosure.onOpen} color="primary">
        Add new album
      </Button>
      <AlbumCreationModal {...disclosure} />
    </>
  );
};
