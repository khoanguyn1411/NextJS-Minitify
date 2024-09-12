import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  type useDisclosure,
} from "@nextui-org/react";
import { type FC } from "react";
import { Controller, useForm } from "react-hook-form";

import { createUser } from "@/core/apis/users";
import { RegisterData } from "@/core/models/registerData";
import { useError } from "@/shared/hooks/useError";

import { Password } from "../../Password";

type Props = ReturnType<typeof useDisclosure>;

export const RegisterModal: FC<Props> = (props) => {
  const { notifyOnAppError, extractErrorsToForm } = useError();
  const { control, handleSubmit, reset, setError } = useForm<RegisterData.Type>(
    {
      resolver: zodResolver(RegisterData.schema),
    }
  );

  const onFormSubmit = async (data: RegisterData.Type) => {
    const result = await createUser(data);
    notifyOnAppError(result);
    extractErrorsToForm({ result, setError });
  };

  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange} onClose={reset}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Sign Up</ModalHeader>
            <ModalBody>
              <form className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <Controller
                    control={control}
                    name="firstName"
                    render={({ field, fieldState }) => (
                      <Input
                        autoComplete="given-name"
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
                        autoComplete="family-name"
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
                  name="userName"
                  render={({ field, fieldState }) => (
                    <Input
                      label="Username"
                      autoComplete="username"
                      placeholder="yourusername123"
                      errorMessage={fieldState.error?.message}
                      isInvalid={!!fieldState.error?.message}
                      {...field}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <Password
                      label="Password"
                      autoComplete="password"
                      placeholder="yourSecretPassword"
                      errorMessage={fieldState.error?.message}
                      isInvalid={!!fieldState.error?.message}
                      {...field}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field, fieldState }) => (
                    <Password
                      label="Confirm password"
                      placeholder="yourSecretPassword"
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
              <Button color="primary" onClick={handleSubmit(onFormSubmit)}>
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
