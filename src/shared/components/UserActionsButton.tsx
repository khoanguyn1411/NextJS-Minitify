"use client";

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useDisclosure } from "@nextui-org/react";
import { type FC, type ReactNode } from "react";
import {
  BiAddToQueue,
  BiDotsHorizontalRounded,
  BiSkipNextCircle,
  BiSkipPreviousCircle,
} from "react-icons/bi";

import { usePlayingSongStore } from "../stores/usePlayingSongStore";
import { PlaylistsModal } from "./playlists/PlaylistsModal";

type Item = {
  readonly label: string;
  readonly icon: ReactNode;
  readonly onClick?: () => void;
};

type Props = {
  readonly onTrigger?: () => void;
  readonly onClose?: () => void;
};

export const UserActionsButton: FC<Props> = ({ onTrigger, onClose }) => {
  const { moveToNextSong, moveToPreviousSong } = usePlayingSongStore();
  const playlistModalDisclosure = useDisclosure();

  const items: readonly Item[] = [
    {
      icon: <BiAddToQueue className="text-lg" />,
      label: "Add to playlist",
      onClick: () => playlistModalDisclosure.onOpen(),
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
      <Dropdown onClose={onClose}>
        <DropdownTrigger>
          <Button
            onClick={onTrigger}
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
      <PlaylistsModal {...playlistModalDisclosure} />
    </>
  );
};
