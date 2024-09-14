"use client";

import { Divider, Link, type NavbarItem } from "@nextui-org/react";
import { type FC, type ReactNode } from "react";
import { BiLibrary, BiMusic, BiTrendingUp, BiWorld } from "react-icons/bi";

type NavbarItem = {
  readonly title: string;
  readonly url: string;
  readonly icon: ReactNode;
};

const navbarItems: readonly NavbarItem[] = [
  {
    title: "Library",
    url: "/library",
    icon: <BiLibrary />,
  },
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
  return (
    <div className="flex flex-col p-container gap-3 h-full">
      <div className="flex flex-col">
        {navbarItems.map((item) => (
          <Link
            className="flex gap-3 py-2 hover:text-primary-100 w-full self-start"
            key={item.url}
            color="foreground"
            href={item.url}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>
      <Divider />
      <div className="mt-auto">
        <p className="text-sm">This is self-edu project.</p>
        <p className="text-xs">No commercial purpose.</p>
      </div>
    </div>
  );
};
