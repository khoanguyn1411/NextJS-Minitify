import { type Artist } from "@prisma/client";
import { type FC } from "react";

import { getSongs } from "@/core/apis/songApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { SCROLLABLE_TARGET_ID } from "@/shared/constants/ids";

import { SongListView } from "../items-view/SongListView";

type Props = {
  readonly artistId: Artist["id"];
};

export const ArtistSongsListView: FC<Props> = async ({ artistId }) => {
  const fetchFunction = async (pageNumber: number) => {
    "use server";
    return getSongs({
      ...BaseFilterParams.initialPagination,
      pageNumber,
      search: "",
      artistIds: [artistId],
    });
  };

  const songPage = await fetchFunction(
    BaseFilterParams.initialPagination.pageNumber,
  );

  return (
    <div>
      <SongListView
        className="top-0"
        belongTo={{ type: "artist", id: artistId }}
        page={songPage}
        scrollableTargetId={SCROLLABLE_TARGET_ID}
        fetchFunction={fetchFunction}
      />
    </div>
  );
};
