"use client";

import { Link, useDisclosure } from "@nextui-org/react";
import classNames from "classnames";
import { usePathname, useRouter } from "next/navigation";
import { type FC, type ReactNode } from "react";

import { useCurrentUserStore } from "../stores/useCurrentUserStore";
import { LoginModal } from "./auth/login/LoginModal";

export type NavigationItemProps = {
  readonly title: string;
  readonly url: string;
  readonly icon: ReactNode;
  readonly isAuthRequire?: boolean;
};

export const NavigationItem: FC<NavigationItemProps> = (item) => {
  const pathname = usePathname();
  const { currentUser } = useCurrentUserStore();
  const router = useRouter();
  const loginDisclosure = useDisclosure();

  const handleLoginSuccess = () => {
    router.push("/library");
  };

  const isCurrentUrl = pathname === item.url;

  if (item.isAuthRequire && currentUser == null) {
    return (
      <>
        <button
          type="button"
          className={classNames(
            "flex gap-3 items-center p-2 rounded-lg hover:text-primary-100 w-full self-start",
            isCurrentUrl && "bg-primary-400/15",
          )}
          onClick={loginDisclosure.onOpen}
          key={item.url}
        >
          {item.icon}
          {item.title}
        </button>
        <LoginModal onLoginSuccess={handleLoginSuccess} {...loginDisclosure} />
      </>
    );
  }

  return (
    <Link
      className={classNames(
        "flex gap-3 items-center p-2 rounded-lg hover:text-primary-100 w-full self-start",
        isCurrentUrl && "bg-primary-400/15",
      )}
      key={item.url}
      color={isCurrentUrl ? "primary" : "foreground"}
      href={item.url}
    >
      {item.icon}
      {item.title}
    </Link>
  );
};
