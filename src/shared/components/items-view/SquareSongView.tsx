import { type FC } from "react";

import { type ISong } from "@/core/apis/songApis";

import { BaseSquareItemView } from "./BaseSquareItemView";

type Props = {
  readonly song: ISong;
};

export const SquareSongView: FC<Props> = ({ song }) => {
  return (
    <BaseSquareItemView
      imageUrl={song.imageUrl}
      primaryText={song.name}
      secondaryText={song.artists.map((artist) => artist.name).join(", ")}
    />
  );
};
