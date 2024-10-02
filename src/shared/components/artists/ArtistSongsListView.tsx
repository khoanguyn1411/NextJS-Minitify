import { type Artist } from "@prisma/client";
import { type FC } from "react";

import { getSongs } from "@/core/apis/songApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";

import { SongListView } from "../items-view/SongListView";

type Props = {
  readonly artistId: Artist["id"];
};

export const ArtistSongsListView: FC<Props> = async ({ artistId }) => {
  const fetchFunction = async (
    page: Pick<BaseFilterParams.Pagination, "pageNumber">,
  ) => {
    "use server";
    return getSongs({
      ...BaseFilterParams.initialPagination,
      ...page,
      search: "",
      artistIds: [artistId],
    });
  };

  const songPage = await fetchFunction(BaseFilterParams.initialPagination);
  const wrapperId = "artists-song-list-view";

  return (
    <div id={wrapperId} className="max-h-[380px] overflow-auto">
      <SongListView
        className="top-0"
        belongTo={{ type: "artist", id: artistId }}
        page={songPage}
        scrollableTargetId={wrapperId}
        fetchFunction={fetchFunction}
      />
    </div>
  );
};
