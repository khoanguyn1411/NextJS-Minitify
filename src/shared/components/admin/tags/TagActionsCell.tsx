import { useDisclosure } from "@nextui-org/react";
import { type FC } from "react";

import { deleteTagById, type ITag } from "@/core/apis/tagApis";

import { ActionTableCell } from "../../ActionTableCell";
import { TagCreationModal } from "./TagCreationModal";

type Props = {
  readonly tag: ITag;
};

export const TagActionsCell: FC<Props> = ({ tag }) => {
  const disclosure = useDisclosure();
  const onDeleteClick = async () => {
    await deleteTagById(tag.id);
  };
  return (
    <>
      <ActionTableCell
        onDeleteClick={onDeleteClick}
        onEditClick={disclosure.onOpen}
      />
      <TagCreationModal {...disclosure} tag={tag} />
    </>
  );
};
