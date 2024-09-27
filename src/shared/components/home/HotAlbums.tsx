import { type FC } from "react";

import { getAlbums } from "@/core/apis/albumsApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";

import { SectionWithTitle } from "../SectionWithTitle";
import { SquareAlbumView } from "../album/SquareAlbumView";

export const HotAlbums: FC = async () => {
  const albumsPage = await getAlbums({
    ...BaseFilterParams.initialPagination,
    pageSize: 6,
    search: "",
  });

  return (
    <SectionWithTitle title="Hot albums">
      {albumsPage.items.map((album) => (
        <SquareAlbumView key={album.id} album={album} />
      ))}
    </SectionWithTitle>
  );
};
