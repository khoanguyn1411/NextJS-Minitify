"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  type useDisclosure,
} from "@nextui-org/react";
import { type Artist } from "@prisma/client";
import { useEffect, type FC } from "react";
import { Controller, useForm } from "react-hook-form";

import { getArtists } from "@/core/apis/artistApis";
import { createSong, type ISong } from "@/core/apis/songApis";
import { uploadFile } from "@/core/apis/uploadApis";
import { SongData } from "@/core/models/songData";
import { useError } from "@/shared/hooks/useError";
import { useNotify } from "@/shared/hooks/useNotify";
import { convertFileToFormData } from "@/shared/services/uploadService";

import { FileUploader } from "../../FileUploader";
import { AppMultipleSelect } from "../../autocompletes/AppMultipleSelect";
import { type SelectConfig } from "../../autocompletes/useFetchAutocomplete";

type Props = ReturnType<typeof useDisclosure> & {
  readonly song?: ISong;
};

const config: SelectConfig<Artist, number> = {
  toOption: (item) => ({ value: item.id, label: item.name }),
  fetchApi: (filters) => getArtists(filters),
  toReadable: (item) => item.name,
  toKey: (item) => item.id,
};

export const SongCreationModal: FC<Props> = (props) => {
  const { extractErrorsToForm, notifyOnAppError, isSuccess } = useError();
  const { notify } = useNotify();
  const isEditMode = props.song != null;

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isLoading, isDirty },
  } = useForm<SongData.Type>({
    defaultValues: SongData.initialValue,
    resolver: zodResolver(SongData.schema),
  });

  const getUrls = async (
    data: SongData.Type,
  ): Promise<{ songUrl: string; imageUrl: string }> => {
    const defaultUrls = {
      imageUrl: "",
      songUrl: "",
    };
    if (data.image != null && data.song != null) {
      const imageFilePathPromise = uploadFile(
        convertFileToFormData(data.image),
      );
      const songFilePathPromise = uploadFile(
        convertFileToFormData(data.song),
        "musics",
      );
      const [imageFilePath, songFilePath] = await Promise.all([
        imageFilePathPromise,
        songFilePathPromise,
      ]);
      if (!isSuccess(imageFilePath)) {
        notifyOnAppError(imageFilePath);
        return defaultUrls;
      }
      if (!isSuccess(songFilePath)) {
        notifyOnAppError(songFilePath);
        return defaultUrls;
      }
      return {
        imageUrl: imageFilePath.path,
        songUrl: songFilePath.path,
      };
    }
    return defaultUrls;
  };

  const onFormSubmit = async (data: SongData.Type) => {
    const { imageUrl, songUrl } = await getUrls(data);
    if (imageUrl == "" || songUrl == "") {
      return;
    }
    const result = await createSong({
      ...data,
      image: imageUrl,
      song: songUrl,
    });
    extractErrorsToForm({ result, setError });
    notifyOnAppError(result);
    if (isSuccess(result)) {
      notify("Created new artist", { type: "success" });
      props.onClose();
      reset(SongData.initialValue);
    }
  };

  useEffect(() => {
    if (!isEditMode) {
      return;
    }
    if (!props.isOpen) {
      return;
    }
    reset({
      name: props.song.name,
      image: null,
      song: null,
      artistIds: props.song.artists.map((artist) => ({
        value: artist.id,
        label: config.toReadable(artist),
      })),
    });
  }, [isEditMode, props.isOpen]);

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={reset}
      isDismissable={false}
      onOpenChange={props.onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-2xl">Add New Song</ModalHeader>
            <ModalBody className="flex flex-col gap-7">
              <form className="flex flex-col gap-4">
                <Controller
                  control={control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <Input
                      label="Name"
                      placeholder="Beautiful In White"
                      errorMessage={fieldState.error?.message}
                      isInvalid={!!fieldState.error?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="image"
                  render={({ field, fieldState }) => (
                    <FileUploader
                      currentUrl={props.song?.imageUrl}
                      fileAccepted=".jpg,.jpeg,.png"
                      label="Image"
                      errorMessage={fieldState.error?.message}
                      {...field}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="song"
                  render={({ field, fieldState }) => (
                    <FileUploader
                      currentUrl={props.song?.songUrl}
                      fileAccepted=".mp3"
                      label="Song"
                      errorMessage={fieldState.error?.message}
                      {...field}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="artistIds"
                  render={({ field, fieldState }) => (
                    <AppMultipleSelect
                      label="Artists"
                      errorMessage={fieldState.error?.message}
                      placeholder="Select Artist"
                      config={config}
                      {...field}
                    />
                  )}
                />
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onClick={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                color="primary"
                isDisabled={!isDirty}
                onClick={handleSubmit(onFormSubmit)}
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
