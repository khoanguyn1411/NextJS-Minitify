import { useDisclosure } from "@nextui-org/react";
import { type FC } from "react";

import { deleteSongById, type ISong } from "@/core/apis/songApis";

import { ActionTableCell } from "../../ActionTableCell";
import { SongCreationModal } from "./SongCreationModal";

type Props = {
  readonly song: ISong;
};

export const SongActionsCell: FC<Props> = ({ song }) => {
  const disclosure = useDisclosure();
  const onDeleteClick = async () => {
    await deleteSongById(song.id);
  };
  return (
    <>
      <ActionTableCell
        onDeleteClick={onDeleteClick}
        onEditClick={disclosure.onOpen}
      />
      <SongCreationModal {...disclosure} song={song} />
    </>
  );
};
