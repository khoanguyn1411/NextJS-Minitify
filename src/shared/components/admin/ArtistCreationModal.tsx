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
import { type FC } from "react";
import { Controller, useForm } from "react-hook-form";

import { createArtist } from "@/core/apis/artistApis";
import { uploadFile } from "@/core/apis/uploadApis";
import { ArtistData } from "@/core/models/artistData";
import { useError } from "@/shared/hooks/useError";
import { useNotify } from "@/shared/hooks/useNotify";
import { convertFileToFormData } from "@/shared/services/uploadService";

import { FileUploader } from "../FileUploader";

type Props = ReturnType<typeof useDisclosure>;

export const ArtistCreationModal: FC<Props> = (props) => {
  const { extractErrorsToForm, notifyOnAppError, isSuccess } = useError();
  const { notify } = useNotify();
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isLoading },
  } = useForm<ArtistData.Type>({
    resolver: zodResolver(ArtistData.schema),
  });

  const onFormSubmit = async (data: ArtistData.Type) => {
    let imageUrl = "";
    if (data.image != null) {
      const filePath = await uploadFile(convertFileToFormData(data.image));
      if (!isSuccess(filePath)) {
        notifyOnAppError(filePath);
        return;
      }
      imageUrl = filePath.path;
    }
    const result = await createArtist({ ...data, image: imageUrl });
    extractErrorsToForm({ result, setError });
    notifyOnAppError(result);
    if (isSuccess(result)) {
      notify("Created new artist", { type: "success" });
      props.onClose();
      reset(ArtistData.initialValue);
    }
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={reset}
      onOpenChange={props.onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-2xl">Add New Artist</ModalHeader>
            <ModalBody className="flex flex-col gap-7">
              <form className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <Controller
                    control={control}
                    name="firstName"
                    render={({ field, fieldState }) => (
                      <Input
                        label="First name"
                        placeholder="Danny"
                        errorMessage={fieldState.error?.message}
                        isInvalid={!!fieldState.error?.message}
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="lastName"
                    render={({ field, fieldState }) => (
                      <Input
                        label="Last name"
                        placeholder="John"
                        errorMessage={fieldState.error?.message}
                        isInvalid={!!fieldState.error?.message}
                        {...field}
                      />
                    )}
                  />
                </div>
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
