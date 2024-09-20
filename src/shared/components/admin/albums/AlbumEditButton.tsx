import { Button } from "@nextui-org/button";
import { Tooltip, useDisclosure } from "@nextui-org/react";
import { type FC } from "react";
import { BiEdit } from "react-icons/bi";

import { type IAlbum } from "@/core/apis/albumsApis";

import { AlbumCreationModal } from "./AlbumCreationModal";

type Props = {
  readonly album: IAlbum;
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
