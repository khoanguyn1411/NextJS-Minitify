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

import { createTag, updateTag, type ITag } from "@/core/apis/tagApis";
import { TagData } from "@/core/models/tagData";
import { useError } from "@/shared/hooks/useError";
import { useNotify } from "@/shared/hooks/useNotify";

type Props = ReturnType<typeof useDisclosure> & {
  readonly tag?: ITag;
};

export const TagCreationModal: FC<Props> = (props) => {
  const { extractErrorsToForm, notifyOnAppError, isSuccess } = useError();
  const { notify } = useNotify();

  const isEditMode = props.tag != null;

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isLoading, isDirty },
  } = useForm<TagData.Type>({
    shouldUnregister: true,
    resolver: zodResolver(TagData.schema),
  });

  const onFormSubmit = async (data: TagData.Type) => {
    const result = isEditMode
      ? await updateTag(props.tag.id, data)
      : await createTag(data);

    extractErrorsToForm({ result, setError });
    notifyOnAppError(result);
    if (isSuccess(result)) {
      notify(isEditMode ? "Edited tag successfully" : "Added new tag", {
        type: "success",
      });
      props.onClose();
      if (isEditMode) {
        return;
      }
      reset(TagData.initialValue);
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
      name: props.tag.name,
    });
  }, [isEditMode, props.isOpen]);

  return (
    <Modal
      isOpen={props.isOpen}
      isDismissable={false}
      scrollBehavior="inside"
      onClose={reset}
      onOpenChange={props.onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-2xl">
              {isEditMode ? "Edit" : "Add"} Tag
            </ModalHeader>
            <ModalBody className="flex flex-col gap-7">
              <form className="flex flex-col gap-4">
                <Controller
                  control={control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <Input
                      label="Name"
                      placeholder="#abcxzy"
                      errorMessage={fieldState.error?.message}
                      isInvalid={!!fieldState.error?.message}
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
