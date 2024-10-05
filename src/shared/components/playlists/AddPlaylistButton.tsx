"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { type FC } from "react";
import { FormProvider } from "react-hook-form";

import { useCurrentUserStore } from "@/shared/stores/useCurrentUserStore";

import { PlaylistCreationForm } from "./PlaylistCreationForm";
import { usePlaylistForm } from "./usePlaylistForm";

export const AddPlaylistButton: FC = () => {
  const { currentUser } = useCurrentUserStore();
  const userId = currentUser?.id ?? null;
  const disclosure = useDisclosure();
  const { form, onFormSubmit } = usePlaylistForm({
    userId,
    onSubmitSuccess: disclosure.onClose,
  });
  return (
    <>
      <Button color="primary" onClick={disclosure.onOpen}>
        Add playlist
      </Button>
      <Modal
        isOpen={disclosure.isOpen}
        scrollBehavior="inside"
        size="2xl"
        onClose={disclosure.onClose}
        onOpenChange={disclosure.onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-2xl">Playlists</ModalHeader>
              <ModalBody className="flex flex-col gap-7">
                <FormProvider {...form}>
                  <PlaylistCreationForm userId={userId} />
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
