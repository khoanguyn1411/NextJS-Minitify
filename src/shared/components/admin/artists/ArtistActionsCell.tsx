import { useDisclosure } from "@nextui-org/react";
import { type FC } from "react";

import { deleteArtistById, type IArtist } from "@/core/apis/artistApis";

import { ActionTableCell } from "../../ActionTableCell";
import { ArtistCreationModal } from "./ArtistCreationModal";

type Props = {
  readonly artist: IArtist;
};

export const ArtistActionsCell: FC<Props> = ({ artist }) => {
  const disclosure = useDisclosure();
  const onDeleteClick = async () => {
    await deleteArtistById(artist.id);
  };
  return (
    <>
      <ActionTableCell
        onDeleteClick={onDeleteClick}
        onEditClick={disclosure.onOpen}
      />
      <ArtistCreationModal {...disclosure} artist={artist} />
    </>
  );
};
