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

import { useToggleExecutionState } from "../hooks/useToggleExecutionState";

type Props = {
  readonly onEditClick: () => void;
  readonly onDeleteClick: () => Promise<void>;
};

export const ActionTableCell: FC<Props> = ({ onDeleteClick, onEditClick }) => {
  const { onOpen, onOpenChange, isOpen, onClose } = useDisclosure();
  const [isLoading, toggleExecutionState] = useToggleExecutionState();

  const handleDeleteClick = () => {
    toggleExecutionState(async () => {
      await onDeleteClick();
      onClose();
    });
  };

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
                <p>
                  All related data will be removed and this action cannot be
                  undo.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isLoading={isLoading}
                  isDisabled={!isDirty}
                  onClick={handleDeleteClick}
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
