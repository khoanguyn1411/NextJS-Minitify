import { Card, CardBody, Image } from "@nextui-org/react";
import { type FC } from "react";

import { type ISong } from "@/core/apis/songApis";

type Props = {
  readonly song: ISong;
};

export const SquareSongView: FC<Props> = ({ song }) => {
  return (
    <Card
      isFooterBlurred
      radius="lg"
      isPressable
      className="rounded shadow-none 
        p-3 flex flex-col gap-2 bg-transparent cursor-pointer border-none min-w-[160px] w-[160px]"
    >
      <CardBody className="overflow-visible p-0">
        <Image
          alt="Woman listing to music"
          className="object-cover"
          src={song.imageUrl}
        />
      </CardBody>
      <div className="flex gap-1 flex-col">
        <p className="truncate-2 text-left">{song.name}</p>
        <p className="truncate-2 text-white/70 text-left text-xs">
          {song.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
    </Card>
  );
};
