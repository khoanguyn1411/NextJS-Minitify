"use client";

import { Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { type FC, type ReactNode } from "react";

export type NavigationItemProps = {
  readonly title: string;
  readonly url: string;
  readonly icon: ReactNode;
};

export const NavigationItem: FC<NavigationItemProps> = (item) => {
  const pathname = usePathname();

  const isCurrentUrl = (url: string) => {
    return pathname === url;
  };

  return (
    <Link
      className="flex gap-3 items-center py-2 hover:text-primary-100 w-full self-start"
      key={item.url}
      color={isCurrentUrl(item.url) ? "primary" : "foreground"}
      href={item.url}
    >
      {item.icon}
      {item.title}
    </Link>
  );
};
