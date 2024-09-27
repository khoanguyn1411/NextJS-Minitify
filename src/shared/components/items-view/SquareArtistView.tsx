import { type FC } from "react";

import { type IArtist } from "@/core/apis/artistApis";

import { BaseSquareItemView } from "./BaseSquareItemView";

type Props = {
  readonly artist: IArtist;
};

export const SquareArtistView: FC<Props> = ({ artist }) => {
  return (
    <BaseSquareItemView
      isRounded
      imageUrl={artist.imageUrl}
      primaryText={artist.name}
      secondaryText="Artist"
    />
  );
};
