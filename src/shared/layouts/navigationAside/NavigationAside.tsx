"use client";

import { Link, type NavbarItem } from "@nextui-org/react";
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
    <div className="flex flex-col py-container">
      {navbarItems.map((item) => (
        <Link
          className="flex gap-3 py-2 px-container hover:text-primary-100 w-full self-start"
          key={item.url}
          color="foreground"
          href={item.url}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </div>
  );
};
