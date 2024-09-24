"use client";

import { Link } from "@nextui-org/react";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { type FC, type ReactNode } from "react";

export type NavigationItemProps = {
  readonly title: string;
  readonly url: string;
  readonly icon: ReactNode;
};

export const NavigationItem: FC<NavigationItemProps> = (item) => {
  const pathname = usePathname();

  const isCurrentUrl = pathname === item.url;

  return (
    <Link
      className={classNames(
        "flex gap-3 items-center p-2 rounded-lg hover:text-primary-100 w-full self-start",
        isCurrentUrl && "bg-primary-400/10",
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
