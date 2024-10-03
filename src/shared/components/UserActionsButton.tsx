"use client";

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { type FC, type ReactNode } from "react";
import {
  BiAddToQueue,
  BiDotsHorizontalRounded,
  BiSkipNextCircle,
  BiSkipPreviousCircle,
} from "react-icons/bi";

import { usePlayingSongStore } from "../stores/usePlayingSongStore";

type Item = {
  readonly label: string;
  readonly icon: ReactNode;
  readonly onClick?: () => void;
};

export const UserActionsButton: FC = () => {
  const { moveToNextSong, moveToPreviousSong } = usePlayingSongStore();
  const items: readonly Item[] = [
    {
      icon: <BiAddToQueue className="text-lg" />,
      label: "Add to playlist",
    },
    {
      icon: <BiSkipNextCircle className="text-lg" />,
      label: "Next song",
      onClick: () => moveToNextSong(),
    },
    {
      icon: <BiSkipPreviousCircle className="text-lg" />,
      label: "Previous song",
      onClick: () => moveToPreviousSong(),
    },
  ];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly radius="full" variant="bordered">
          <BiDotsHorizontalRounded className="text-xl" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu items={items}>
        {(item) => (
          <DropdownItem
            onClick={item.onClick}
            startContent={item.icon}
            key={item.label}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};
