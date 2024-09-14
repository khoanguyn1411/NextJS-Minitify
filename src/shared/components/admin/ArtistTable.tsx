import { type Artist } from "@prisma/client";
import { useEffect, useState, type FC } from "react";

import { getArtists } from "@/core/apis/artistApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { type Pagination } from "@/core/models/pagination";

export const ArtistTable: FC = async () => {
  const [artistsPage, setArtistsPage] = useState<Pagination<Artist> | null>(
    null,
  );

  async function fetchArtists() {
    const page = await getArtists(BaseFilterParams.initialPagination);
    setArtistsPage(page);
  }

  useEffect(() => {
    fetchArtists();
  }, []);

  return <div>{artistsPage?.totalCount}</div>;
};
