import { Button } from "@nextui-org/button";
import { Tooltip, useDisclosure } from "@nextui-org/react";
import { type FC } from "react";
import { BiEdit } from "react-icons/bi";

import { type IArtist } from "@/core/apis/artistApis";

import { ArtistCreationModal } from "./ArtistCreationModal";

type Props = {
  readonly artist: IArtist;
};

export const ArtistEditButton: FC<Props> = ({ artist }) => {
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
      <ArtistCreationModal {...disclosure} artist={artist} />
    </>
  );
};
