import { Card, Image } from "@nextui-org/react";
import { type FC } from "react";

import { type IAlbum } from "@/core/apis/albumsApis";

import { PlayableButton } from "../PlayableButton";

type Props = {
  readonly album: IAlbum;
};

export const SquareAlbumView: FC<Props> = ({ album }) => {
  return (
    <Card
      isFooterBlurred
      radius="lg"
      isPressable
      className="rounded shadow-none relative group items-start
    p-3 flex flex-col gap-2 bg-transparent cursor-pointer border-none min-w-[170px] w-[170px]"
    >
      <Image
        radius="full"
        alt="Woman listing to music"
        className="object-cover"
        classNames={{
          wrapper: "aspect-square",
          img: "aspect-square w-[inherit]",
        }}
        src={album.imageUrl}
      />

      <div className="flex gap-1 flex-col">
        <p className="truncate-2 text-left">{album.name}</p>
        <p className="truncate-2 text-white/70 text-left text-xs">
          {album.artist.name}
        </p>
      </div>
      <PlayableButton />
    </Card>
  );
};
