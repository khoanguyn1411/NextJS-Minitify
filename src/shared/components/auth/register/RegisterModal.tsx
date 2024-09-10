import { zodResolver } from '@hookform/resolvers/zod';
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
import {
  Controller,
  useForm
} from 'react-hook-form';


import { RegisterForm } from "./registerForm";
import { FormItem } from '../../FormItem';

  type Props = ReturnType<typeof useDisclosure>
  
export const RegisterModal: FC<Props> = (props) => {

  const {
    control,
    setError,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<RegisterForm.Type>({
    resolver: zodResolver(RegisterForm.schema),
  });

  return (
    <Modal {...props}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
                Sign Up
            </ModalHeader>
            <ModalBody className="flex flex-col gap-4">
              <div className="flex gap-4">
                <FormItem>
                  <Controller control={control}>
                    <Input label="First name" placeholder="Danny"/>
                  </Controller>
                </FormItem>
                <Input label="Last name" placeholder="John"/>
              </div>
              <Input label="Username" placeholder="yourusername123"/>
              <Input label="Password" placeholder="yourSecretPassword"/>
              <Input label="Confirm password" placeholder="yourSecretPassword"/>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={onClose}>
                  Cancel
              </Button>
              <Button color="primary" onPress={onClose}>
                  Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
  