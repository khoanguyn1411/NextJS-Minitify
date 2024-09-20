import { Button } from "@nextui-org/button";
import { Tooltip, useDisclosure } from "@nextui-org/react";
import { type Album } from "@prisma/client";
import { type FC } from "react";
import { BiEdit } from "react-icons/bi";

import { AlbumCreationModal } from "./AlbumCreationModal";

type Props = {
  readonly album: Album;
};

export const AlbumEditButton: FC<Props> = ({ album }) => {
  const disclosure = useDisclosure();
  return (
    <>
      <Tooltip content="Edit">
        <Button
          variant="flat"
          size="sm"
          color="primary"
          isIconOnly
          onClick={disclosure.onOpen}
        >
          <BiEdit className="text-lg" />
        </Button>
      </Tooltip>
      <AlbumCreationModal {...disclosure} album={album} />
    </>
  );
};
