import { type FC } from "react";

import { type IAlbum } from "@/core/apis/albumsApis";

import { BaseSquareItemView } from "./BaseSquareItemView";

type Props = {
  readonly album: IAlbum;
};

export const SquareAlbumView: FC<Props> = ({ album }) => {
  return (
    <BaseSquareItemView
      imageUrl={album.imageUrl}
      primaryText={album.name}
      secondaryText={album.artist.name}
    />
  );
};
