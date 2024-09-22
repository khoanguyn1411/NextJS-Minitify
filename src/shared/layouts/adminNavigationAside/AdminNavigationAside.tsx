"use client";

import { Divider, NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import { BiAlbum, BiMale, BiMusic, BiTag } from "react-icons/bi";

import {
  NavigationItem,
  type NavigationItemProps,
} from "@/shared/components/NavigationItem";

const adminNavbarItems: readonly NavigationItemProps[] = [
  {
    title: "Songs",
    url: "/admin/songs",
    icon: <BiMusic />,
  },
  {
    title: "Albums",
    url: "/admin/albums",
    icon: <BiAlbum />,
  },
  {
    title: "Artists",
    url: "/admin/artists",
    icon: <BiMale />,
  },
  {
    title: "Tags",
    url: "/admin/tags",
    icon: <BiTag />,
  },
];

export const AdminNavigationAside: FC = () => {
  const router = useRouter();
  return (
    <NextUIProvider
      navigate={router.push}
      className="flex flex-col p-container gap-3 h-full"
    >
      <div className="flex flex-col">
        {adminNavbarItems.map((item) => (
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
