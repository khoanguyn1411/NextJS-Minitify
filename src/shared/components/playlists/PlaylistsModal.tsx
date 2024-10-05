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

import { addSongToPlaylists } from "@/core/apis/playlistApis";
import { type ISong } from "@/core/apis/songApis";
import { useCurrentUserStore } from "@/shared/stores/useCurrentUserStore";

import { PlaylistModalContent } from "./PlaylistModalContent";
import { usePlaylistForm } from "./usePlaylistForm";
import {
  PlaylistsModalContext,
  usePlaylistsModalContext,
} from "./usePlaylistsModalStore";

type Props = ReturnType<typeof useDisclosure> & {
  readonly currentSong: ISong | null;
};

export const PlaylistsModal: FC<Props> = (props) => {
  const { currentUser } = useCurrentUserStore();
  const userId = currentUser?.id ?? null;
  const contextValue = usePlaylistsModalContext({ userId });

  const { mode, fetchPage, selectedPlaylists, setSelectedPlaylists } =
    contextValue;

  const { form, onFormSubmit } = usePlaylistForm({
    userId,
    onSubmitSuccess: () => fetchPage(),
  });

  const handleSubmitButtonClick = () => {
    if (mode === "loading") {
      return;
    }
    if (mode === "create") {
      form.handleSubmit(onFormSubmit);
      return;
    }
    if (props.currentSong == null) {
      return;
    }
    addSongToPlaylists(selectedPlaylists, [props.currentSong.id]);
  };

  const handleModalClose = () => {
    setSelectedPlaylists([]);
  };

  return (
    <Modal
      isOpen={props.isOpen}
      scrollBehavior="inside"
      size="2xl"
      onClose={handleModalClose}
      onOpenChange={props.onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-2xl">Playlists</ModalHeader>
            <ModalBody className="flex flex-col gap-7">
              <PlaylistsModalContext.Provider value={contextValue}>
                <FormProvider {...form}>
                  <PlaylistModalContent />
                </FormProvider>
              </PlaylistsModalContext.Provider>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                variant="light"
                onClick={() => {
                  handleModalClose();
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button color="primary" onClick={handleSubmitButtonClick}>
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
