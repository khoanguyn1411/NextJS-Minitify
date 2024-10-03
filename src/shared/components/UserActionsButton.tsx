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
} from "react-icons/bi";

type Item = {
  readonly label: string;
  readonly icon: ReactNode;
};

const items: readonly Item[] = [
  {
    icon: <BiAddToQueue className="text-lg" />,
    label: "Add to playlist",
  },
  {
    icon: <BiSkipNextCircle className="text-lg" />,
    label: "Next song",
  },
];

export const UserActionsButton: FC = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly radius="full" variant="bordered">
          <BiDotsHorizontalRounded className="text-xl" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu items={items}>
        {(item) => (
          <DropdownItem startContent={item.icon} key={item.label}>
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};
