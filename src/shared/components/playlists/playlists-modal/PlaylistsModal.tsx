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
import { useMemo, type FC } from "react";
import { FormProvider } from "react-hook-form";

import {
  addSongsToPlaylists,
  removeSongsFromPlaylists,
} from "@/core/apis/playlistApis";
import { type ISong } from "@/core/apis/songApis";
import { useNotify } from "@/shared/hooks/useNotify";
import { useToggleExecutionState } from "@/shared/hooks/useToggleExecutionState";
import { useCurrentUserStore } from "@/shared/stores/useCurrentUserStore";

import { usePlaylistForm } from "../usePlaylistForm";
import { PlaylistModalContent } from "./PlaylistModalContent";
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

  const contextValue = usePlaylistsModalContext({
    ...props,
    userId,
    currentSong: props.currentSong,
  });
  const { notify } = useNotify();
  const [isSubmitting, toggleExecutionState] = useToggleExecutionState();

  const {
    mode,
    fetchPage,
    selectedPlaylists,
    originalSelectedPlaylists,
    setSelectedPlaylists,
    resetMode,
  } = contextValue;

  const { form, onFormSubmit } = usePlaylistForm({
    userId,
    onSubmitSuccess: () => fetchPage(),
  });

  const shouldSubmitButtonDisabled = useMemo(() => {
    if (mode === "create") {
      return !form.formState.isDirty;
    }
    if (mode === "loading") {
      return true;
    }
    return selectedPlaylists.length === 0;
  }, [mode, selectedPlaylists, form.formState.isDirty]);

  const handleModalClose = () => {
    props.onClose();
    setSelectedPlaylists([]);
    resetMode();
  };

  const handleSubmitButtonClick = async () => {
    if (mode === "loading") {
      return;
    }
    if (mode === "create") {
      return form.handleSubmit(onFormSubmit)();
    }
    const currentSong = props.currentSong;
    if (currentSong == null) {
      return;
    }
    toggleExecutionState(async () => {
      const originalSelectedPlaylistsSet = new Set(originalSelectedPlaylists);
      const selectedPlaylistsSet = new Set(selectedPlaylists);

      const playlistsNeedToAddSong = selectedPlaylistsSet.difference(
        originalSelectedPlaylistsSet,
      );

      const playlistNeedToRemoveSong =
        originalSelectedPlaylistsSet.difference(selectedPlaylistsSet);

      const callbacks = [];

      if (playlistNeedToRemoveSong.size > 0) {
        callbacks.push(
          removeSongsFromPlaylists(Array.from(playlistNeedToRemoveSong), [
            currentSong.id,
          ]),
        );
      }
      if (playlistsNeedToAddSong.size > 0) {
        callbacks.push(
          addSongsToPlaylists(Array.from(playlistsNeedToAddSong), [
            currentSong.id,
          ]),
        );
      }

      await Promise.all(callbacks);
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
                isDisabled={shouldSubmitButtonDisabled}
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
