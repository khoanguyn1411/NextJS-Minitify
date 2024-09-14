import { type FC } from "react";

import { findUser } from "@/core/apis/usersApis";
import { LoginButton } from "@/shared/components/auth/login/LoginButton";
import { RegisterButton } from "@/shared/components/auth/register/RegisterButton";
import { validateRequest } from "@/shared/services/authService";

import { UserDropdown } from "./UserDropdown";

export const UserAction: FC = async () => {
  const { user } = await validateRequest();

  if (user == null) {
    return (
      <div className="flex gap-4 ml-auto">
        <RegisterButton />
        <LoginButton />
      </div>
    );
  }
  const currentUser = await findUser({ id: user.id });

  if (currentUser == null) {
    return <div>No user founded.</div>;
  }

  return <UserDropdown user={currentUser} />;
};
