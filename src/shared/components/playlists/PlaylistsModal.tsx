"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  type useDisclosure,
} from "@nextui-org/react";
import { type FC } from "react";
import { FormProvider } from "react-hook-form";

import { useCurrentUserStore } from "@/shared/stores/useCurrentUserStore";

import { PlaylistModalContent } from "./PlaylistModalContent";
import { usePlaylistData } from "./usePlaylistData";
import { usePlaylistForm } from "./usePlaylistForm";

type Props = ReturnType<typeof useDisclosure>;

export const PlaylistsModal: FC<Props> = (props) => {
  const { currentUser } = useCurrentUserStore();
  const { playlistsPage, isLoading, fetchPage } = usePlaylistData();

  const { form, onFormSubmit } = usePlaylistForm({
    userId: currentUser?.id ?? null,
    onSubmitSuccess: () => fetchPage(),
  });

  return (
    <Modal
      isOpen={props.isOpen}
      scrollBehavior="inside"
      size="2xl"
      onOpenChange={props.onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-2xl">Playlists</ModalHeader>
            <ModalBody className="flex flex-col gap-7">
              <FormProvider {...form}>
                <PlaylistModalContent
                  userId={currentUser?.id ?? null}
                  isLoading={isLoading}
                  playlistsPage={playlistsPage}
                />
              </FormProvider>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onClick={onClose}>
                Cancel
              </Button>
              <Button color="primary" onClick={form.handleSubmit(onFormSubmit)}>
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
