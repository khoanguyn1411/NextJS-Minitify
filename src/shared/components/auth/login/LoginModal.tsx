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
import { Controller, Form, useForm } from "react-hook-form";

import { LoginData } from "@/core/models/loginData";
import { useError } from "@/shared/hooks/useError";
import { signIn } from "@/shared/services/authService";

import { Password } from "../../Password";

type Props = ReturnType<typeof useDisclosure>;

export const LoginModal: FC<Props> = (props) => {
  const { notifyOnAppError, extractErrorsToForm } = useError();
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isLoading },
  } = useForm<LoginData.Type>({
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
            <ModalHeader className="text-2xl">Sign In</ModalHeader>
            <ModalBody className="flex flex-col gap-7">
              <div className="flex flex-col gap-1">
                <h1 className="text-xl">Welcome back to Minitify</h1>
                <p className="text-sm text-primary-200">Enjoy your tracks!</p>
              </div>
              <Form className="flex flex-col gap-4">
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
              </Form>
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
