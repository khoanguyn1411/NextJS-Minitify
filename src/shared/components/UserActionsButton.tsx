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

type Props = {
  readonly isHidden?: boolean;
  readonly onDropdownTrigger?: () => void;
  readonly onDropdownClose?: () => void;
  readonly onPlaylistModalOpen: () => void;
};

export const UserActionsButton: FC<Props> = ({
  isHidden,
  onDropdownTrigger,
  onDropdownClose,
  onPlaylistModalOpen,
}) => {
  const { moveToNextSong, moveToPreviousSong } = usePlayingSongStore();

  const items: readonly Item[] = [
    {
      icon: <BiAddToQueue className="text-lg" />,
      label: "Modified playlist",
      onClick: () => onPlaylistModalOpen(),
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
    <>
      <Dropdown onClose={onDropdownClose}>
        <DropdownTrigger className={isHidden ? "hidden" : ""}>
          <Button
            onClick={onDropdownTrigger}
            isIconOnly
            radius="full"
            variant="bordered"
          >
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
    </>
  );
};
