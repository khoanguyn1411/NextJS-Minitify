import { Input } from "@nextui-org/input";
import { type FC, type PropsWithChildren } from "react";
import { BiSearch } from "react-icons/bi";

import { LoginButton } from "../components/auth/login/LoginButton";
import { RegisterButton } from "../components/auth/register/RegisterButton";
import { validateRequest } from "../services/authService";

export const Header: FC<PropsWithChildren> = async () => {
  const { user } = await validateRequest();
  console.log({ user });
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

      {user == null ? (
        <div className="flex gap-4 ml-auto">
          <RegisterButton />
          <LoginButton />
        </div>
      ) : (
        <h1>Logged in</h1>
      )}
    </div>
  );
};
