import { type FC } from "react";

import { getSongs, type ISong } from "@/core/apis/songApis";
import { type BaseFilterParams } from "@/core/models/baseFilterParams";
import { type Pagination } from "@/core/models/pagination";
import { SCROLLABLE_TARGET_ID } from "@/shared/constants/ids";

import { SongListView } from "../items-view/SongListView";

type Props = {
  readonly songsPage: Pagination<ISong>;
};

export const TrendingSongsListView: FC<Props> = async ({ songsPage }) => {
  const fetchFunction = async (page: BaseFilterParams.Pagination) => {
    "use server";
    return getSongs({ ...page, search: "", sortOptions: { playTime: "desc" } });
  };

  return (
    <div>
      <SongListView
        className="top-0"
        belongTo={null}
        page={songsPage}
        scrollableTargetId={SCROLLABLE_TARGET_ID}
        fetchFunction={fetchFunction}
      />
    </div>
  );
};
