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
import { useNotify } from "@/shared/hooks/useNotify";
import { useToggleExecutionState } from "@/shared/hooks/useToggleExecutionState";

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
  const { notify } = useNotify();
  const [isSubmitting, toggleExecutionState] = useToggleExecutionState();

  const { mode, fetchPage, selectedPlaylists, setSelectedPlaylists } =
    contextValue;

  const { form, onFormSubmit } = usePlaylistForm({
    userId,
    onSubmitSuccess: () => fetchPage(),
  });

  const handleModalClose = () => {
    props.onClose();
    setSelectedPlaylists([]);
  };

  const handleSubmitButtonClick = async () => {
    if (mode === "loading") {
      return;
    }
    if (mode === "create") {
      form.handleSubmit(onFormSubmit);
      return;
    }
    const currentSong = props.currentSong;
    if (currentSong == null) {
      return;
    }
    toggleExecutionState(async () => {
      await addSongToPlaylists(selectedPlaylists, [currentSong.id]);
      notify("Added to playlist", { type: "success" });
      handleModalClose();
    });
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
        {() => (
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
                onClick={handleModalClose}
              >
                Cancel
              </Button>
              <Button
                isLoading={isSubmitting || form.formState.isLoading}
                color="primary"
                onClick={handleSubmitButtonClick}
              >
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
