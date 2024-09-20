"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  type useDisclosure,
} from "@nextui-org/react";
import { type Artist, type Song } from "@prisma/client";
import { useEffect, type FC } from "react";
import { Controller, useForm } from "react-hook-form";

import { createAlbum, updateAlbum, type IAlbum } from "@/core/apis/albumsApis";
import { getArtists } from "@/core/apis/artistApis";
import { getSongs } from "@/core/apis/songApis";
import { uploadFile } from "@/core/apis/uploadApis";
import { AlbumData } from "@/core/models/albumData";
import { useError } from "@/shared/hooks/useError";
import { useNotify } from "@/shared/hooks/useNotify";
import { convertFileToFormData } from "@/shared/services/uploadService";
import { assertNonNull } from "@/shared/utils/assertNonNull";

import { FileUploader } from "../../FileUploader";
import { AppMultipleSelect } from "../../autocompletes/AppMultipleSelect";
import { AppSelect } from "../../autocompletes/AppSelect";
import { type SelectConfig } from "../../autocompletes/useFetchAutocomplete";

type Props = ReturnType<typeof useDisclosure> & {
  readonly album?: IAlbum;
};

const songsSelectConfig: SelectConfig<Song, number> = {
  toOption: (item) => ({ value: item.id, label: item.name }),
  fetchApi: (filters) => getSongs(filters),
  toReadable: (item) => item.name,
  toKey: (item) => item.id,
};

const artistSelectConfig: SelectConfig<Artist, number> = {
  toOption: (item) => ({ value: item.id, label: item.fullName }),
  fetchApi: (filters) => getArtists(filters),
  toReadable: (item) => item.fullName,
  toKey: (item) => item.id,
};

export const AlbumCreationModal: FC<Props> = (props) => {
  const { extractErrorsToForm, notifyOnAppError, isSuccess } = useError();
  const { notify } = useNotify();

  const isEditMode = props.album != null;

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isLoading },
  } = useForm<AlbumData.Type>({
    resolver: zodResolver(
      isEditMode ? AlbumData.editSchema : AlbumData.createSchema,
    ),
  });

  const onFormSubmit = async (data: AlbumData.Type) => {
    let imageUrl = props.album?.imageUrl ?? "";
    if (data.image != null) {
      const filePath = await uploadFile(convertFileToFormData(data.image));
      if (!isSuccess(filePath)) {
        notifyOnAppError(filePath);
        return;
      }
      imageUrl = filePath.path;
    }
    assertNonNull(data.artistId);

    const result = isEditMode
      ? await updateAlbum(props.album.id, {
          ...data,
          artistId: data.artistId.value,
          image: imageUrl,
        })
      : await createAlbum({
          ...data,
          artistId: data.artistId.value,
          image: imageUrl,
        });

    extractErrorsToForm({ result, setError });
    notifyOnAppError(result);
    if (isSuccess(result)) {
      notify("Created new album", { type: "success" });
      props.onClose();
      if (isEditMode) {
        return;
      }
      reset(AlbumData.initialValue);
    }
  };

  useEffect(() => {
    if (!isEditMode) {
      return;
    }
    reset({
      name: props.album.name,
      description: props.album.description,
      artistId: {
        value: props.album.artist.id,
        label: artistSelectConfig.toReadable(props.album.artist),
      },
      songIds: props.album.songs.map((song) => ({
        value: song.id,
        label: songsSelectConfig.toReadable(song),
      })),
      image: null,
    });
  }, [isEditMode]);

  return (
    <Modal
      isOpen={props.isOpen}
      isDismissable={false}
      onClose={reset}
      onOpenChange={props.onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-2xl">
              {isEditMode ? "Edit" : "Add"} Album
            </ModalHeader>
            <ModalBody className="flex flex-col gap-7">
              <form className="flex flex-col gap-4">
                <Controller
                  control={control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <Input
                      label="Name"
                      placeholder="Good Album"
                      errorMessage={fieldState.error?.message}
                      isInvalid={!!fieldState.error?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="description"
                  render={({ field, fieldState }) => (
                    <Textarea
                      label="Description"
                      placeholder="Your description"
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
                      fileAccepted=".jpg,.jpeg,.png"
                      label="Image"
                      currentImageUrl={props.album?.imageUrl}
                      errorMessage={fieldState.error?.message}
                      {...field}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="artistId"
                  render={({ field, fieldState }) => (
                    <AppSelect
                      label="Artist"
                      errorMessage={fieldState.error?.message}
                      placeholder="Select artist"
                      config={artistSelectConfig}
                      {...field}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="songIds"
                  render={({ field, fieldState }) => (
                    <AppMultipleSelect
                      label="Songs"
                      errorMessage={fieldState.error?.message}
                      placeholder="Select songs"
                      config={songsSelectConfig}
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
