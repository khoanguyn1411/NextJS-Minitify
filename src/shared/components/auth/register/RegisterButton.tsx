"use client";

import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/react";
import { type FC } from "react";

import { RegisterModal } from "./RegisterModal";

export const RegisterButton: FC = () => {
  const registerDisclosure = useDisclosure();
  return (
    <>
      <Button onClick={registerDisclosure.onOpen} variant="bordered">
        Sign up
      </Button>
      <RegisterModal {...registerDisclosure} />
    </>
  );
};
