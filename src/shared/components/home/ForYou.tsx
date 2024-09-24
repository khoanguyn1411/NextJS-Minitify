import { type FC } from "react";

import { getSongs } from "@/core/apis/songApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";

import { SquareSongView } from "../music/SquareSongView";
import { SectionWithTitle } from "../SectionWithTitle";

export const ForYou: FC = async () => {
  const songsPage = await getSongs({
    ...BaseFilterParams.initialPagination,
    pageSize: 6,
    search: "",
  });
  return (
    <SectionWithTitle title="For you">
      {songsPage.items.map((song) => (
        <SquareSongView key={song.id} song={song} />
      ))}
    </SectionWithTitle>
  );
};
