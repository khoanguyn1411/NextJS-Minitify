"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar, NextUIProvider } from "@nextui-org/react";
import { type User as PrismaUser } from "@prisma/client";
import { useRouter } from "next/navigation";
import { type FC, type ReactNode } from "react";

import { User } from "@/core/models/user";
import { logout } from "@/shared/services/authService";

type Props = {
  readonly user: PrismaUser;
};

type DropdownAction = {
  readonly url?: string;
  readonly title: string;
  readonly className?: string;
  readonly render?: (option: DropdownAction) => ReactNode;
};

export const UserDropdown: FC<Props> = ({ user }) => {
  const router = useRouter();

  const onDropdownItemClick = (item: DropdownAction) => {
    if (item.title === "Logout") {
      logout();
    }
  };

  const profileDropdownOptions: readonly DropdownAction[] = [
    {
      title: "Profile",
      className: "h-14",
      render: () => (
        <div className="flex flex-col gap-0.5">
          <p className="font-semibold text-primary-200">
            {User.getFullName(user)}
          </p>
          <p className="text-xs font-semibold">Sign in with {user.username}</p>
        </div>
      ),
    },
  ];
  const userDropdownOptions: readonly DropdownAction[] = [
    {
      title: "Logout",
    },
  ];
  const adminDropdownOptions: readonly DropdownAction[] = [
    {
      title: "Admin",
      url: "/admin",
    },
  ];

  const dropdownItems =
    user.role === "admin"
      ? [
          ...profileDropdownOptions,
          ...adminDropdownOptions,
          ...userDropdownOptions,
        ]
      : [...profileDropdownOptions, ...userDropdownOptions];

  return (
    <NextUIProvider navigate={router.push} className="justify-self-end">
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
        <DropdownMenu aria-label="Dynamic Actions" items={dropdownItems}>
          {(item) => (
            <DropdownItem
              className={item.className}
              onClick={() => onDropdownItemClick(item)}
              key={item.title}
              href={item.url}
            >
              {item.render ? item.render(item) : item.title}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </NextUIProvider>
  );
};
