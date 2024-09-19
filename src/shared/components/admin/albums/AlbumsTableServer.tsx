import { type FC } from "react";

import { getArtists } from "@/core/apis/artistApis";
import { type BaseFilterParams } from "@/core/models/baseFilterParams";

import { AlbumsTableClient } from "./AlbumsTableClient";

type Props = {
  readonly filters: BaseFilterParams.Combined;
};

export const AlbumsTableServer: FC<Props> = async ({ filters }) => {
  const page = await getArtists(filters);
  return <AlbumsTableClient page={page} />;
};
