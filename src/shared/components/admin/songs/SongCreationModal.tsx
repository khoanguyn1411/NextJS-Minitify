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
import { useEffect, type FC } from "react";
import { Controller, useForm } from "react-hook-form";

import { getAlbums, type IAlbum } from "@/core/apis/albumsApis";
import { getArtists, type IArtist } from "@/core/apis/artistApis";
import { createSong, updateSong, type ISong } from "@/core/apis/songApis";
import { uploadFile } from "@/core/apis/uploadApis";
import { SongData } from "@/core/models/songData";
import { useError } from "@/shared/hooks/useError";
import { useNotify } from "@/shared/hooks/useNotify";
import { convertFileToFormData } from "@/shared/services/uploadService";

import { FileUploader } from "../../FileUploader";
import { AppMultipleSelect } from "../../autocompletes/AppMultipleSelect";
import { AppSelect } from "../../autocompletes/AppSelect";
import { type SelectConfig } from "../../autocompletes/useFetchAutocomplete";

type Props = ReturnType<typeof useDisclosure> & {
  readonly song?: ISong;
};

const artistSelectConfig: SelectConfig<IArtist, number> = {
  toOption: (item) => ({ value: item.id, label: item.name }),
  fetchApi: (filters) => getArtists(filters),
  toReadable: (item) => item.name,
  toKey: (item) => item.id,
};

const albumSelectConfig: SelectConfig<IAlbum, number> = {
  toOption: (item) => ({ value: item.id, label: item.name }),
  fetchApi: (filters) => getAlbums(filters),
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
    resolver: zodResolver(
      isEditMode ? SongData.editSchema : SongData.createSchema,
    ),
  });

  const getUrls = async (
    data: SongData.Type,
  ): Promise<{ songUrl: string; imageUrl: string }> => {
    const defaultUrls = {
      imageUrl: props.song?.imageUrl ?? "",
      songUrl: props.song?.songUrl ?? "",
    };
    const promises = [];

    if (data.image != null) {
      promises.push(uploadFile(convertFileToFormData(data.image)));
    } else {
      promises.push(null);
    }

    if (data.song != null) {
      promises.push(uploadFile(convertFileToFormData(data.song), "musics"));
    } else {
      promises.push(null);
    }

    const [imageFilePath, songFilePath] = await Promise.all(promises);

    if (!isSuccess(imageFilePath)) {
      notifyOnAppError(imageFilePath);
      return defaultUrls;
    }
    if (!isSuccess(songFilePath)) {
      notifyOnAppError(songFilePath);
      return defaultUrls;
    }
    return {
      imageUrl: imageFilePath?.path ?? defaultUrls.imageUrl,
      songUrl: songFilePath?.path ?? defaultUrls.songUrl,
    };
  };

  const onFormSubmit = async (data: SongData.Type) => {
    const { imageUrl, songUrl } = await getUrls(data);
    const result = isEditMode
      ? await updateSong(props.song.id, {
          ...data,
          image: imageUrl,
          song: songUrl,
        })
      : await createSong({
          ...data,
          image: imageUrl,
          song: songUrl,
        });
    extractErrorsToForm({ result, setError });
    notifyOnAppError(result);
    if (isSuccess(result)) {
      notify(!isEditMode ? "Created new song" : "Song updated", {
        type: "success",
      });
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
      albumId:
        props.song.album != null
          ? {
              value: props.song.album.id,
              label: props.song.album.name,
            }
          : null,
      artistIds: props.song.artists.map((artist) => ({
        value: artist.id,
        label: artistSelectConfig.toReadable(artist),
      })),
    });
  }, [isEditMode, props.isOpen]);

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={reset}
      scrollBehavior="inside"
      isDismissable={false}
      onOpenChange={props.onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-2xl">
              {isEditMode ? "Edit Song" : "Add Song"}
            </ModalHeader>
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
                      config={artistSelectConfig}
                      {...field}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="albumId"
                  render={({ field, fieldState }) => (
                    <AppSelect
                      label="Album"
                      isClearable
                      errorMessage={fieldState.error?.message}
                      placeholder="Select Album"
                      config={albumSelectConfig}
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
