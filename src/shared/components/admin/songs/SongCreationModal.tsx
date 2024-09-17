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
import { type FC } from "react";
import { Controller, useForm } from "react-hook-form";

import { getArtists } from "@/core/apis/artistApis";
import { createSong } from "@/core/apis/songApis";
import { uploadFile } from "@/core/apis/uploadApis";
import { SongData } from "@/core/models/songData";
import { useError } from "@/shared/hooks/useError";
import { useNotify } from "@/shared/hooks/useNotify";
import { convertFileToFormData } from "@/shared/services/uploadService";

import { AppSelect, type SelectConfig } from "../../AppSelect";
import { FileUploader } from "../../FileUploader";

type Props = ReturnType<typeof useDisclosure>;

const config: SelectConfig<Artist, number> = {
  toOption: (item) => ({ value: item.id, label: item.fullName }),
  fetchApi: (filters) => getArtists(filters),
  toReadable: (item) => item.fullName,
};

export const SongCreationModal: FC<Props> = (props) => {
  const { extractErrorsToForm, notifyOnAppError, isSuccess } = useError();
  const { notify } = useNotify();
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isLoading },
  } = useForm<SongData.Type>({
    defaultValues: SongData.initialValue,
    resolver: zodResolver(SongData.schema),
  });

  const onFormSubmit = async (data: SongData.Type) => {
    let imageUrl = "";
    let songUrl = "";
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
        return;
      }
      if (!isSuccess(songFilePath)) {
        notifyOnAppError(songFilePath);
        return;
      }
      imageUrl = imageFilePath.path;
      songUrl = songFilePath.path;
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
                    <AppSelect
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
