"use client";

import { Button, Card } from "@nextui-org/react";
import classNames from "classnames";
import { type FC } from "react";
import { BiPlay } from "react-icons/bi";

import { AppImage } from "../AppImage";

type Props = {
  readonly imageUrl: string;
  readonly primaryText: string;
  readonly secondaryText: string;
  readonly isRounded?: boolean;
  readonly onClick?: () => void;
};

export const BaseSquareItemView: FC<Props> = ({
  imageUrl,
  primaryText,
  secondaryText,
  isRounded = false,
  onClick,
}) => {
  return (
    <Card
      radius="lg"
      isPressable
      onClick={onClick}
      className="rounded shadow-none relative group items-start
    p-3 flex flex-col gap-2 bg-transparent cursor-pointer border-none min-w-[170px] w-[170px]"
    >
      <AppImage
        radius={isRounded ? "full" : "lg"}
        alt={primaryText}
        className="object-cover"
        classNames={{
          wrapper: "aspect-square",
          img: "aspect-square w-[inherit]",
        }}
        isFromApi
        src={imageUrl}
      />

      <div className="flex gap-1 flex-col">
        <p className="truncate-2 text-left">{primaryText}</p>
        <p className="truncate-2 text-white/70 text-left text-xs">
          {secondaryText}
        </p>
      </div>
      <Button
        as="div"
        isIconOnly
        color="primary"
        variant="shadow"
        onClick={onClick}
        className={classNames(
          "absolute z-50 opacity-0 right-5 transition-[0.2s ease]",
          "top-[110px] group-hover:opacity-100",
        )}
      >
        <BiPlay className="text-3xl" />
      </Button>
    </Card>
  );
};
