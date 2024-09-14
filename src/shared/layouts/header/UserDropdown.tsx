"use client";

import { Button } from "@nextui-org/button";
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
          <Button
            endContent={
              <Avatar
                color="primary"
                size="sm"
                name={User.getFirstChar(user)}
              />
            }
            variant="light"
          >
            {User.getFullName(user)}
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem onClick={onLogout} key="logout">
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
