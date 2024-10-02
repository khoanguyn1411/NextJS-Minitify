"use client";

import { useRouter } from "next/navigation";
import { type FC } from "react";

import { type IAlbum } from "@/core/apis/albumsApis";

import { BaseSquareItemView } from "./BaseSquareItemView";

type Props = {
  readonly album: IAlbum;
};

export const SquareAlbumView: FC<Props> = ({ album }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/albums/${album.id}`);
  };
  return (
    <BaseSquareItemView
      imageUrl={album.imageUrl}
      primaryText={album.name}
      onClick={handleClick}
      secondaryText={album.artist.name}
    />
  );
};
