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

import { LoginData } from "@/core/models/loginData";
import { useError } from "@/shared/hooks/useError";
import { signIn } from "@/shared/services/authService";

import { Password } from "../../Password";

type Props = ReturnType<typeof useDisclosure>;

export const LoginModal: FC<Props> = (props) => {
  const { notifyOnAppError, extractErrorsToForm } = useError();
  const { control, handleSubmit, reset, setError } = useForm<LoginData.Type>({
    resolver: zodResolver(LoginData.schema),
  });

  const onFormSubmit = async (data: LoginData.Type) => {
    const result = await signIn(data);
    notifyOnAppError(result);
    extractErrorsToForm({ result, setError });
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
            <ModalHeader className="flex flex-col gap-1">
              Modal Title
            </ModalHeader>
            <ModalBody>
              <form className="flex flex-col gap-4">
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
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={onClose}>
                Close
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
