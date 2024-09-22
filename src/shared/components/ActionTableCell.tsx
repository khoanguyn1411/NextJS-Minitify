"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { type FC } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { MdWarning } from "react-icons/md";
import { isDirty } from "zod";

type Props = {
  readonly onEditClick: () => void;
  readonly onDeleteClick: () => void;
};

export const ActionTableCell: FC<Props> = ({ onDeleteClick, onEditClick }) => {
  const { onOpen, onOpenChange, isOpen } = useDisclosure();
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
            onClick={onOpen}
          >
            <BiTrash className="text-lg" />
          </Button>
        </Tooltip>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-2xl text-warning-400 items-center gap-2">
                <MdWarning />
                Warning{" "}
              </ModalHeader>
              <ModalBody className="flex flex-col gap-2">
                <p>Are you sure you want to delete this?</p>
                <p>This action cannot be undo.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isDisabled={!isDirty}
                  onClick={onDeleteClick}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
