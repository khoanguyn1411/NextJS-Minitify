"use client";

import { Divider, Link, type NavbarItem } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { type FC, type ReactNode } from "react";
import { BiLibrary, BiMusic, BiTrendingUp, BiWorld } from "react-icons/bi";

type NavbarItem = {
  readonly title: string;
  readonly url: string;
  readonly icon: ReactNode;
};

const userNavbarItems: readonly NavbarItem[] = [
  {
    title: "Home",
    url: "/",
    icon: <BiTrendingUp />,
  },
  {
    title: "Library",
    url: "/library",
    icon: <BiLibrary />,
  },
];

const discoverNarItems: readonly NavbarItem[] = [
  {
    title: "Trending Musics",
    url: "/trending-musics",
    icon: <BiTrendingUp />,
  },
  {
    title: "Discover",
    url: "/discover",
    icon: <BiWorld />,
  },
  {
    title: "New songs",
    url: "/new-songs",
    icon: <BiMusic />,
  },
];

export const NavigationAside: FC = () => {
  const pathname = usePathname();

  const isCurrentUrl = (url: string) => {
    return pathname === url;
  };

  return (
    <div className="flex flex-col p-container gap-3 h-full">
      <div className="flex flex-col">
        {userNavbarItems.map((item) => (
          <Link
            className="flex gap-3 py-2 hover:text-primary-100 w-full self-start"
            key={item.url}
            color={isCurrentUrl(item.url) ? "primary" : "foreground"}
            href={item.url}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>
      <Divider />

      <div className="flex flex-col">
        {discoverNarItems.map((item) => (
          <Link
            className="flex gap-3 py-2 hover:text-primary-100 w-full self-start"
            key={item.url}
            color={isCurrentUrl(item.url) ? "primary" : "foreground"}
            href={item.url}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>
      <Divider />

      <div className="mt-auto">
        <Divider className="mb-3" />
        <p className="text-sm">
          This is self-edu project. No commercial purpose.
        </p>
      </div>
    </div>
  );
};
