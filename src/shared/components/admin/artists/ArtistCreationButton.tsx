"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import { type FC } from "react";

import { ArtistCreationModal } from "./ArtistCreationModal";

export const ArtistCreationButton: FC = () => {
  const disclosure = useDisclosure();

  return (
    <>
      <Button onClick={disclosure.onOpen} color="primary">
        Add new artist
      </Button>
      <ArtistCreationModal {...disclosure} />
    </>
  );
};
