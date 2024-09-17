import { type FC } from "react";

import { getSongs } from "@/core/apis/songApis";
import { type BaseFilterParams } from "@/core/models/baseFilterParams";

import { SongsTableClient } from "./SongTableClient";

type Props = {
  readonly filters: BaseFilterParams.Combined;
};

export const SongsTableServer: FC<Props> = async ({ filters }) => {
  const artistsPage = await getSongs(filters);
  return <SongsTableClient page={artistsPage} />;
};
