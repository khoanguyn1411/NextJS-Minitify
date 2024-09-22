import { Button } from "@nextui-org/button";
import { Tooltip, useDisclosure } from "@nextui-org/react";
import { type FC } from "react";
import { BiEdit } from "react-icons/bi";

import { type ITag } from "@/core/apis/tagApis";

import { TagCreationModal } from "./TagCreationModal";

type Props = {
  readonly tag: ITag;
};

export const TagEditButton: FC<Props> = ({ tag }) => {
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
      <TagCreationModal {...disclosure} tag={tag} />
    </>
  );
};
