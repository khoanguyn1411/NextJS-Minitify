"use client";

import { type FC } from "react";

import { type IPlaylist } from "@/core/apis/playlistApis";

import { BaseSquareItemView } from "./BaseSquareItemView";

type Props = {
  readonly playlist: IPlaylist;
};

export const SquarePlaylistView: FC<Props> = ({ playlist }) => {
  return (
    <BaseSquareItemView
      imageUrl={playlist.imageUrl}
      primaryText={playlist.name}
      secondaryText={playlist.description}
    />
  );
};
