import { type FC } from "react";

import { LoginButton } from "@/shared/components/auth/login/LoginButton";
import { RegisterButton } from "@/shared/components/auth/register/RegisterButton";
import { useCurrentUserStore } from "@/shared/stores/useCurrentUserStore";

import { UserDropdown } from "./UserDropdown";

export const UserActions: FC = () => {
  const { currentUser } = useCurrentUserStore();

  if (currentUser == null) {
    return (
      <div className="flex gap-4 ml-auto">
        <RegisterButton />
        <LoginButton />
      </div>
    );
  }

  if (currentUser == null) {
    return <div>No user founded.</div>;
  }

  return <UserDropdown user={currentUser} />;
};
