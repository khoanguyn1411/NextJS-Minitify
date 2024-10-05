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
import { usePlaylistForm } from "./usePlaylistForm";
import {
  PlaylistsModalContext,
  usePlaylistsModalContext,
} from "./usePlaylistsModalStore";

type Props = ReturnType<typeof useDisclosure>;

export const PlaylistsModal: FC<Props> = (props) => {
  const { currentUser } = useCurrentUserStore();
  const userId = currentUser?.id ?? null;
  const contextValue = usePlaylistsModalContext({ userId });

  const { form, onFormSubmit } = usePlaylistForm({
    userId,
    onSubmitSuccess: () => contextValue.fetchPage(),
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
                <PlaylistsModalContext.Provider value={contextValue}>
                  <PlaylistModalContent />
                </PlaylistsModalContext.Provider>
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
