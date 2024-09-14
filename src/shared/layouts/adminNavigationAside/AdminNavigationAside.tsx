"use client";

import { Divider, NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import { BiMusic, BiUpload } from "react-icons/bi";

import {
  NavigationItem,
  type NavigationItemProps,
} from "@/shared/components/NavigationItem";

const adminNavbarItems: readonly NavigationItemProps[] = [
  {
    title: "New Song",
    url: "/admin/new-song",
    icon: <BiUpload />,
  },
  {
    title: "All Songs",
    url: "/admin/all-songs",
    icon: <BiMusic />,
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
        <p className="text-sm">
          This is self-edu project. No commercial purpose.
        </p>
      </div>
    </NextUIProvider>
  );
};
