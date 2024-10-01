import { type FC } from "react";

import { getSongs, type ISong } from "@/core/apis/songApis";
import { type BaseFilterParams } from "@/core/models/baseFilterParams";
import { type Pagination } from "@/core/models/pagination";

import { SongListView } from "../items-view/SongListView";

type Props = {
  readonly songsPage: Pagination<ISong>;
};

export const TrendingSongsListView: FC<Props> = async ({ songsPage }) => {
  const fetchFunction = async (page: BaseFilterParams.Pagination) => {
    "use server";
    return getSongs({ ...page, search: "", sortOptions: { playTime: "desc" } });
  };

  const wrapperId = "artists-song-list-view";

  return (
    <div id={wrapperId} className="max-h-[380px] overflow-auto">
      <SongListView
        className="top-0"
        belongTo={null}
        page={songsPage}
        scrollableTargetId={wrapperId}
        fetchFunction={fetchFunction}
      />
    </div>
  );
};
