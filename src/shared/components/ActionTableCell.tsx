"use client";

import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/react";
import { type FC } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";

type Props = {
  readonly onEditClick: () => void;
  readonly onDeleteClick: () => void;
};

export const ActionTableCell: FC<Props> = ({ onDeleteClick, onEditClick }) => {
  return (
    <>
      <div className="flex gap-2">
        <Tooltip content="Edit">
          <Button
            variant="flat"
            size="sm"
            color="primary"
            isIconOnly
            onClick={onEditClick}
          >
            <BiEdit className="text-lg" />
          </Button>
        </Tooltip>
        <Tooltip content="Delete">
          <Button
            variant="flat"
            size="sm"
            color="secondary"
            isIconOnly
            onClick={onDeleteClick}
          >
            <BiTrash className="text-lg" />
          </Button>
        </Tooltip>
      </div>
    </>
  );
};
