import { Input } from "@nextui-org/input";
import { type FC, type PropsWithChildren } from "react";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";

import { UserAction } from "./UserActions";

export const Header: FC<PropsWithChildren> = async () => {
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
      <UserAction />
    </div>
  );
};
