import { type FC } from "react";

import { getArtists } from "@/core/apis/artistApis";
import { type BaseFilterParams } from "@/core/models/baseFilterParams";

import { SongsTableClient } from "./SongTableClient";

type Props = {
  readonly filters: BaseFilterParams.Combined;
};

export const SongsTableServer: FC<Props> = async ({ filters }) => {
  const artistsPage = await getArtists(filters);
  return <SongsTableClient page={artistsPage} />;
};
