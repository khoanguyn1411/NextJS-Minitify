import { Input } from "@nextui-org/input";
import { type FC, type PropsWithChildren } from "react";
import { BiSearch } from "react-icons/bi";

import { UserAction } from "./UserActions";

export const Header: FC<PropsWithChildren> = async () => {
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
      <UserAction />
    </div>
  );
};
