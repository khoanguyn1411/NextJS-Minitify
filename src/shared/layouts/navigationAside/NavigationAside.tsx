"use client";

import { Divider, NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import { BiHome, BiLibrary, BiMusic, BiTrendingUp } from "react-icons/bi";

import {
  NavigationItem,
  type NavigationItemProps,
} from "@/shared/components/NavigationItem";

const userNavbarItems: readonly NavigationItemProps[] = [
  {
    title: "Home",
    url: "/",
    icon: <BiHome />,
  },
  {
    title: "Library",
    url: "/library",
    icon: <BiLibrary />,
    isAuthRequire: true,
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
        <p className="text-xs">
          This is self-edu project. No commercial purpose.
        </p>
      </div>
    </NextUIProvider>
  );
};
