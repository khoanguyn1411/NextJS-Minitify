"use-client";

import { type FC } from "react";

import { getSongs } from "@/core/apis/songApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";

import { SongListView } from "../items-view/SongListView";

export const DiscoverSongsListView: FC = async () => {
  const songPage = await getSongs({
    ...BaseFilterParams.initialPagination,
    search: "",
  });

  return <SongListView page={songPage} />;
};
