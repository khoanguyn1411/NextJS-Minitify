"use client";

import { Input } from "@nextui-org/input";
import { SessionProvider, useSession } from "next-auth/react";
import { type PropsWithChildren, type FC } from "react";
import { BiSearch } from "react-icons/bi";

import { LoginButton } from "../components/auth/login/LoginButton";
import { RegisterButton } from "../components/auth/register/RegisterButton";

const InitHeader: FC = () => {
  const { data: session, status } = useSession();
  return (
    <div className="grid grid-cols-3 gap-4 items-center">
      <div>Logo here</div>
      <div className="self-center">
        <Input
          type="search"
          startContent={<BiSearch />}
          placeholder="What do you want to listen?"
        />
      </div>
      {session?.user && <p>{session.user.name}</p>}
      {session?.user == null && (
        <div className="flex gap-4 ml-auto">
          <RegisterButton />
          <LoginButton />
        </div>
      )}
    </div>
  );
};

export const Header: FC<PropsWithChildren> = () => {
  return (
    <SessionProvider>
      <InitHeader />
    </SessionProvider>
  );
};
