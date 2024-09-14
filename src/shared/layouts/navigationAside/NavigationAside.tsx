"use client";

import { Divider, NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import { BiLibrary, BiMusic, BiTrendingUp, BiWorld } from "react-icons/bi";

import {
  NavigationItem,
  type NavigationItemProps,
} from "@/shared/components/NavigationItem";

const userNavbarItems: readonly NavigationItemProps[] = [
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

const discoverNarItems: readonly NavigationItemProps[] = [
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
  const router = useRouter();
  return (
    <NextUIProvider
      navigate={router.push}
      className="flex flex-col p-container gap-3 h-full"
    >
      <div className="flex flex-col">
        {userNavbarItems.map((item) => (
          <NavigationItem key={item.title} {...item} />
        ))}
      </div>
      <Divider />

      <div className="flex flex-col">
        {discoverNarItems.map((item) => (
          <NavigationItem key={item.title} {...item} />
        ))}
      </div>
      <Divider />

      <div className="mt-auto">
        <Divider className="mb-3" />
        <p className="text-sm">
          This is self-edu project. No commercial purpose.
        </p>
      </div>
    </NextUIProvider>
  );
};
