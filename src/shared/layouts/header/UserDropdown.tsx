"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/react";
import { type User as PrismaUser } from "@prisma/client";
import { type FC } from "react";

import { User } from "@/core/models/user";
import { logout } from "@/shared/services/authService";

type Props = {
  readonly user: PrismaUser;
};

export const UserDropdown: FC<Props> = ({ user }) => {
  const onLogout = () => {
    logout();
  };

  return (
    <div className="justify-self-end">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            as="button"
            isBordered
            color="primary"
            size="sm"
            name={User.getFirstChar(user)}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem className="h-14 gap-2">
            <p className="font-semibold text-primary-200">
              {User.getFullName(user)}
            </p>
            <p className="text-xs font-semibold">
              Sign in with {user.username}
            </p>
          </DropdownItem>
          <DropdownItem onClick={onLogout} key="logout">
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
