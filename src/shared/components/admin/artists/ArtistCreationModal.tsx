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
import { useEffect, type FC } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  createArtist,
  updateArtist,
  type IArtist,
} from "@/core/apis/artistApis";
import { uploadFile } from "@/core/apis/uploadApis";
import { ArtistData } from "@/core/models/artistData";
import { useError } from "@/shared/hooks/useError";
import { useNotify } from "@/shared/hooks/useNotify";
import { convertFileToFormData } from "@/shared/services/uploadService";

import { FileUploader } from "../../FileUploader";

type Props = ReturnType<typeof useDisclosure> & {
  readonly artist?: IArtist;
};

export const ArtistCreationModal: FC<Props> = (props) => {
  const { extractErrorsToForm, notifyOnAppError, isSuccess } = useError();
  const { notify } = useNotify();
  const isEditMode = props.artist != null;
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isLoading, isDirty },
  } = useForm<ArtistData.Type>({
    shouldUnregister: true,
    resolver: zodResolver(
      isEditMode ? ArtistData.editSchema : ArtistData.createSchema,
    ),
  });

  const onFormSubmit = async (data: ArtistData.Type) => {
    let imageUrl = props.artist?.imageUrl ?? "";
    if (data.image != null) {
      const filePath = await uploadFile(convertFileToFormData(data.image));
      if (!isSuccess(filePath)) {
        notifyOnAppError(filePath);
        return;
      }
      imageUrl = filePath.path;
    }
    const result = isEditMode
      ? await updateArtist(props.artist.id, { ...data, image: imageUrl })
      : await createArtist({ ...data, image: imageUrl });

    extractErrorsToForm({ result, setError });
    notifyOnAppError(result);
    if (isSuccess(result)) {
      notify(isEditMode ? "Updated successfully" : "Created new artist", {
        type: "success",
      });
      props.onClose();
      if (isEditMode) {
        return;
      }
      reset(ArtistData.initialValue);
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
      name: props.artist.name,
      biography: props.artist.biography,
      image: null,
    });
  }, [isEditMode, props.isOpen]);

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={reset}
      onOpenChange={props.onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-2xl">
              {isEditMode ? "Edit" : "Add"} Artist
            </ModalHeader>
            <ModalBody className="flex flex-col gap-7">
              <form className="flex flex-col gap-4">
                <Controller
                  control={control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <Input
                      label="Name"
                      placeholder="Danny"
                      errorMessage={fieldState.error?.message}
                      isInvalid={!!fieldState.error?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="biography"
                  render={({ field, fieldState }) => (
                    <Textarea
                      label="Biography"
                      autoComplete="biography"
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
                      currentUrl={props.artist?.imageUrl}
                      errorMessage={fieldState.error?.message}
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
