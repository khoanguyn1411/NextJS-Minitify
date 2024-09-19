import { type FC } from "react";

import { getAlbums } from "@/core/apis/albumsApis";
import { type BaseFilterParams } from "@/core/models/baseFilterParams";

import { AlbumsTableClient } from "./AlbumsTableClient";

type Props = {
  readonly filters: BaseFilterParams.Combined;
};

export const AlbumsTableServer: FC<Props> = async ({ filters }) => {
  const page = await getAlbums(filters);
  return <AlbumsTableClient page={page} />;
};
