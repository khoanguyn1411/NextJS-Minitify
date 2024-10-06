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
import { type User } from "@prisma/client";
import { useEffect, type FC } from "react";
import { FormProvider } from "react-hook-form";
import { BiEdit } from "react-icons/bi";

import { type IPlaylist, type IPlaylistDetail } from "@/core/apis/playlistApis";

import { PlaylistCreationForm } from "./PlaylistCreationForm";
import { usePlaylistForm } from "./usePlaylistForm";

type Props = {
  readonly playlist: IPlaylist | IPlaylistDetail;
  readonly userId: User["id"] | null;
};

export const EditPlaylistButton: FC<Props> = ({ playlist, userId }) => {
  const disclosure = useDisclosure();
  const { form, onFormSubmit } = usePlaylistForm({
    userId,
    playlist,
    onSubmitSuccess: disclosure.onClose,
  });

  useEffect(() => {
    if (!disclosure.isOpen) {
      return;
    }
    form.reset({
      name: playlist.name,
      description: playlist.description,
      image: null,
    });
  }, [playlist, disclosure.isOpen]);

  return (
    <>
      <Tooltip content="Click to edit playlist">
        <Button
          color="primary"
          onClick={disclosure.onOpen}
          isIconOnly
          variant="light"
          radius="full"
        >
          <BiEdit className="text-lg" />
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
              <ModalHeader className="text-2xl">Edit Playlist</ModalHeader>
              <ModalBody className="flex flex-col gap-7">
                <FormProvider {...form}>
                  <PlaylistCreationForm playlist={playlist} />
                </FormProvider>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onClick={form.handleSubmit(onFormSubmit)}
                >
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
