import { useDisclosure } from "@nextui-org/react";
import { type FC } from "react";

import { type ITag } from "@/core/apis/tagApis";

import { ActionTableCell } from "../../ActionTableCell";
import { TagCreationModal } from "./TagCreationModal";

type Props = {
  readonly tag: ITag;
};

export const TagActionsCell: FC<Props> = ({ tag }) => {
  const disclosure = useDisclosure();
  return (
    <>
      <ActionTableCell
        onDeleteClick={disclosure.onOpen}
        onEditClick={disclosure.onOpen}
      />
      <TagCreationModal {...disclosure} tag={tag} />
    </>
  );
};
