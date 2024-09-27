import { type FC } from "react";

import { getSongs } from "@/core/apis/songApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";

import { SquareSongView } from "../song/SquareSongView";
import { SectionWithTitle } from "../SectionWithTitle";

export const ChillingSongs: FC = async () => {
  const songsPage = await getSongs({
    ...BaseFilterParams.initialPagination,
    pageSize: 6,
    search: "",
    tagIds: [1, 4],
  });
  return (
    <SectionWithTitle title="Chilling & Healing">
      {songsPage.items.map((song) => (
        <SquareSongView key={song.id} song={song} />
      ))}
    </SectionWithTitle>
  );
};
