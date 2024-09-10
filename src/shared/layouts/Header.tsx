import { Input } from "@nextui-org/input";
import { type FC } from "react";
import { BiSearch } from "react-icons/bi";

import { LoginButton } from "../components/auths/LoginButton";
import { RegisterButton } from "../components/auths/RegisterButton";

export const Header: FC = () => {

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
      <div className="flex gap-4 ml-auto">
        <RegisterButton/>
        <LoginButton/>
      </div>
    </div>
  );
};
