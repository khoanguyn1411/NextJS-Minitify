import { type FC } from "react";

import { getSongs } from "@/core/apis/songApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";

import { SongListView } from "../items-view/SongListView";

const fetchFunction = async (page: BaseFilterParams.Pagination) => {
  "use server";
  return getSongs({ ...page, search: "" });
};

export const DiscoverSongsListView: FC = async () => {
  const songPage = await fetchFunction(BaseFilterParams.initialPagination);

  return (
    <SongListView
      className="top-[60px]"
      belongTo={{ type: "discover" }}
      page={songPage}
      fetchFunction={fetchFunction}
    />
  );
};
