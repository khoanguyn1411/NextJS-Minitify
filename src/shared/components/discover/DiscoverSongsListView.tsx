import { type FC } from "react";

import { getSongs } from "@/core/apis/songApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { SCROLLABLE_TARGET_ID } from "@/shared/constants/ids";

import { SongListView } from "../items-view/SongListView";

const fetchFunction = async (pageNumber: number) => {
  "use server";
  return getSongs({
    ...BaseFilterParams.initialPagination,
    pageNumber,
    search: "",
  });
};

export const DiscoverSongsListView: FC = async () => {
  const songPage = await fetchFunction(
    BaseFilterParams.initialPagination.pageNumber,
  );

  return (
    <SongListView
      className="top-[60px]"
      belongTo={{ type: "discover" }}
      page={songPage}
      scrollableTargetId={SCROLLABLE_TARGET_ID}
      fetchFunction={fetchFunction}
    />
  );
};
