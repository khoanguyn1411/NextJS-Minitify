"use client";

import { type FC } from "react";
import { useRouter } from "next/navigation";

import { type IPlaylist } from "@/core/apis/playlistApis";

import { BaseSquareItemView } from "./BaseSquareItemView";

type Props = {
  readonly playlist: IPlaylist;
};

export const SquarePlaylistView: FC<Props> = ({ playlist }) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`playlists/${playlist.id}`);
  };
  return (
    <BaseSquareItemView
      onClick={onClick}
      imageUrl={playlist.imageUrl}
      primaryText={playlist.name}
      secondaryText={playlist.description}
    />
  );
};
