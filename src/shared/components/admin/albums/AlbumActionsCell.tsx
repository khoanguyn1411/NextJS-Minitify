import { useDisclosure } from "@nextui-org/react";
import { type FC } from "react";

import { deleteAlbumId, type IAlbum } from "@/core/apis/albumsApis";

import { ActionTableCell } from "../../ActionTableCell";
import { AlbumCreationModal } from "./AlbumCreationModal";

type Props = {
  readonly album: IAlbum;
};

export const AlbumActionsCell: FC<Props> = ({ album }) => {
  const disclosure = useDisclosure();
  const onDeleteClick = async () => {
    await deleteAlbumId(album.id);
  };
  return (
    <>
      <ActionTableCell
        onDeleteClick={onDeleteClick}
        onEditClick={disclosure.onOpen}
      />
      <AlbumCreationModal {...disclosure} album={album} />
    </>
  );
};
