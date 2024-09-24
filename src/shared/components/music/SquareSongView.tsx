import { Button, Card, CardBody, Image } from "@nextui-org/react";
import { type FC } from "react";
import { BiPlay } from "react-icons/bi";

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
      className="rounded shadow-none relative group items-start
        p-3 flex flex-col gap-2 bg-transparent cursor-pointer border-none w-[170px]"
    >
      <Image
        alt="Woman listing to music"
        className="object-cover"
        classNames={{
          wrapper: "aspect-square",
          img: "aspect-square w-[inherit]",
        }}
        src={song.imageUrl}
      />

      <div className="flex gap-1 flex-col">
        <p className="truncate-2 text-left">{song.name}</p>
        <p className="truncate-2 text-white/70 text-left text-xs">
          {song.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>

      <Button
        isIconOnly
        color="primary"
        variant="shadow"
        className="absolute z-50 opacity-0 right-5 transition-[0.2s ease] 
          bottom-[100px] group-hover:opacity-100"
      >
        <BiPlay className="text-3xl" />
      </Button>
    </Card>
  );
};
