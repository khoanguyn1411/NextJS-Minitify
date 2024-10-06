"use client";

import { type User } from "@prisma/client";
import Link from "next/link";
import { type FC, type PropsWithChildren } from "react";

import { UserContext } from "@/shared/stores/useCurrentUserStore";

import { GlobalSearch } from "./global-search/GlobalSearch";
import { UserActions } from "./UserActions";

type Props = {
  readonly currentUser?: User | null;
  readonly hasSearchBar?: boolean;
};

const HeaderContent: FC<Pick<Props, "hasSearchBar">> = ({ hasSearchBar }) => {
  return (
    <div className="grid grid-cols-3 gap-4 items-center h-header">
      <Link href="/">Minitify</Link>
      <div className="self-center">{hasSearchBar && <GlobalSearch />}</div>
      <UserActions />
    </div>
  );
};

export const Header: FC<PropsWithChildren<Props>> = ({
  currentUser,
  hasSearchBar,
}) => {
  if (currentUser != null) {
    return (
      <UserContext.Provider value={currentUser}>
        <HeaderContent hasSearchBar={hasSearchBar} />
      </UserContext.Provider>
    );
  }
  return <HeaderContent />;
};
