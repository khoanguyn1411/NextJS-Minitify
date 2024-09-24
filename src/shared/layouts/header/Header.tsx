"use client";

import { Input } from "@nextui-org/input";
import { type FC, type PropsWithChildren } from "react";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import { type User } from "@prisma/client";

import { UserContext } from "@/shared/hooks/useCurrentUser";

import { UserActions } from "./UserActions";

type Props = {
  readonly currentUser?: User | null;
};

const HeaderContent: FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 items-center h-header">
      <Link href="/">Minitify</Link>
      <div className="self-center">
        <Input
          type="search"
          startContent={<BiSearch />}
          placeholder="What do you want to listen?"
        />
      </div>
      <UserActions />
    </div>
  );
};

export const Header: FC<PropsWithChildren<Props>> = ({ currentUser }) => {
  if (currentUser != null) {
    return (
      <UserContext.Provider value={currentUser}>
        <HeaderContent />
      </UserContext.Provider>
    );
  }
  return <HeaderContent />;
};
