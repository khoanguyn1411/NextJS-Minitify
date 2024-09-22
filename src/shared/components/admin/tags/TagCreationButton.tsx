"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import { type FC } from "react";

import { TagCreationModal } from "./TagCreationModal";

export const TagCreationButton: FC = () => {
  const disclosure = useDisclosure();

  return (
    <>
      <Button onClick={disclosure.onOpen} color="primary">
        Add new tag
      </Button>
      <TagCreationModal {...disclosure} />
    </>
  );
};
