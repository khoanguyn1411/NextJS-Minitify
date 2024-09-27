import { Card, Image } from "@nextui-org/react";
import { type FC } from "react";

import { PlayableButton } from "../PlayableButton";

type Props = {
  readonly imageUrl: string;
  readonly primaryText: string;
  readonly secondaryText: string;
};

export const BaseSquareItemView: FC<Props> = ({
  imageUrl,
  primaryText,
  secondaryText,
}) => {
  return (
    <Card
      isFooterBlurred
      radius="lg"
      isPressable
      className="rounded shadow-none relative group items-start
    p-3 flex flex-col gap-2 bg-transparent cursor-pointer border-none min-w-[170px] w-[170px]"
    >
      <Image
        alt="Woman listing to music"
        className="object-cover"
        classNames={{
          wrapper: "aspect-square",
          img: "aspect-square w-[inherit]",
        }}
        src={imageUrl}
      />

      <div className="flex gap-1 flex-col">
        <p className="truncate-2 text-left">{primaryText}</p>
        <p className="truncate-2 text-white/70 text-left text-xs">
          {secondaryText}
        </p>
      </div>
      <PlayableButton />
    </Card>
  );
};
