import { type FC } from "react";

import { getSongs } from "@/core/apis/songApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";

import { SquareSongView } from "../../music/SquareSongView";

export const ForYou: FC = async () => {
  const songsPage = await getSongs({
    ...BaseFilterParams.initialPagination,
    pageSize: 4,
    search: "",
  });
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-xl mx-3 font-semibold">For you</h1>
      <div className="flex flex-row overflow-auto">
        {songsPage.items.map((song) => (
          <SquareSongView key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};
