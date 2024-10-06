"use client";

import { Button, type ButtonProps } from "@nextui-org/button";
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
import { BiTrash } from "react-icons/bi";

import {
  deletePlaylist,
  type IPlaylist,
  type IPlaylistDetail,
} from "@/core/apis/playlistApis";
import { useNotify } from "@/shared/hooks/useNotify";

type Props = {
  readonly playlist: IPlaylist | IPlaylistDetail;
  readonly onDeleteComplete?: () => void;
} & ButtonProps;

export const DeletePlaylistButton: FC<Props> = ({
  playlist,
  onDeleteComplete,
  ...buttonProps
}) => {
  const disclosure = useDisclosure();
  const { notify } = useNotify();

  const handleDelete = async () => {
    await deletePlaylist(playlist.id);
    notify("Delete successfully", { type: "success" });
    onDeleteComplete?.();
  };
  return (
    <>
      <Tooltip content="Delete playlist">
        <Button
          color="secondary"
          onClick={disclosure.onOpen}
          isIconOnly
          variant="flat"
          radius="full"
          {...buttonProps}
        >
          <BiTrash className="text-lg" />
        </Button>
      </Tooltip>
      <Modal
        isOpen={disclosure.isOpen}
        scrollBehavior="inside"
        onClose={disclosure.onClose}
        onOpenChange={disclosure.onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-2xl">Delete Playlist</ModalHeader>
              <ModalBody className="flex flex-col gap-7">
                <p>
                  Are you sure you want to delete this{" "}
                  <span className="font-bold text-primary-300">
                    {playlist.name}
                  </span>{" "}
                  playlist?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onClick={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onClick={handleDelete}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
