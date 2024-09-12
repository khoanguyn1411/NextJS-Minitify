"use client";

import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/react";
import { type FC } from "react";
import { useSession } from "next-auth/react";

import { LoginModal } from "./LoginModal";

export const LoginButton: FC = () => {
  const loginDisclosure = useDisclosure();

  return (
    <>
      <Button onClick={loginDisclosure.onOpen} color="primary">
        Sign in
      </Button>
      <LoginModal {...loginDisclosure} />
    </>
  );
};
