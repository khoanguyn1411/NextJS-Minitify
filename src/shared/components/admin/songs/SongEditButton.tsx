import { Button } from "@nextui-org/button";
import { Tooltip, useDisclosure } from "@nextui-org/react";
import { type FC } from "react";
import { BiEdit } from "react-icons/bi";

import { type ISong } from "@/core/apis/songApis";

import { SongCreationModal } from "./SongCreationModal";

type Props = {
  readonly song: ISong;
};

export const SongEditButton: FC<Props> = ({ song }) => {
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
      <SongCreationModal {...disclosure} song={song} />
    </>
  );
};
