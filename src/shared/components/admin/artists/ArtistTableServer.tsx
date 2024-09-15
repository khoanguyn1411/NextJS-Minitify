import { type FC } from "react";

import { getArtists } from "@/core/apis/artistApis";
import { type BaseFilterParams } from "@/core/models/baseFilterParams";

import { ArtistsTableClient } from "./ArtistTableClient";

type Props = {
  readonly filters: BaseFilterParams.Combined;
};

export const ArtistsTableServer: FC<Props> = async ({ filters }) => {
  const artistsPage = await getArtists(filters);
  return <ArtistsTableClient page={artistsPage} />;
};
