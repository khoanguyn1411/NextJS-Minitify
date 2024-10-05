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

import { addSongToPlaylists } from "@/core/apis/playlistApis";
import { type ISong } from "@/core/apis/songApis";
import { useCurrentUserStore } from "@/shared/stores/useCurrentUserStore";
import { useNotify } from "@/shared/hooks/useNotify";
import { useToggleExecutionState } from "@/shared/hooks/useToggleExecutionState";

import { PlaylistModalContent } from "./PlaylistModalContent";
import { usePlaylistForm } from "../usePlaylistForm";
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
    userId,
    currentSong: props.currentSong,
  });
  const { notify } = useNotify();
  const [isSubmitting, toggleExecutionState] = useToggleExecutionState();

  const {
    mode,
    fetchPage,
    selectedPlaylists,
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
