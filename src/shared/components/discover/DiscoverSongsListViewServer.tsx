import { type FC } from "react";

import { getSongs } from "@/core/apis/songApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";

import { DiscoverSongsListViewClient } from "./DiscoverSongsListViewClient";

export const DiscoverSongsListViewServer: FC = async () => {
  const songPage = await getSongs({
    ...BaseFilterParams.initialPagination,
    search: "",
  });

  return <DiscoverSongsListViewClient page={songPage} />;
};
