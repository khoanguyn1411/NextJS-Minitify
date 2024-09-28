import { type FC } from "react";

import { getArtists } from "@/core/apis/artistApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";

import { SquareArtistView } from "../items-view/SquareArtistView";
import { SectionWithTitle } from "../SectionWithTitle";

export const FamousArtists: FC = async () => {
  const artistsPage = await getArtists({
    ...BaseFilterParams.initialPagination,
    pageSize: 6,
    search: "",
  });
  return (
    <SectionWithTitle title="Famous artists">
      {artistsPage.items.map((artist) => (
        <SquareArtistView key={artist.id} artist={artist} />
      ))}
    </SectionWithTitle>
  );
};
