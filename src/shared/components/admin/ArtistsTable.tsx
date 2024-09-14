"use client";

import { type Artist } from "@prisma/client";
import { useEffect, useState, type FC } from "react";

import { getArtists } from "@/core/apis/artistApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { type Pagination } from "@/core/models/pagination";

export const ArtistsTable: FC = () => {
  const [artistsPage, setArtistsPage] = useState<Pagination<Artist> | null>(
    null,
  );

  const fetchArtistPage = async () => {
    const page = await getArtists(BaseFilterParams.initialPagination);
    setArtistsPage(page);
  };

  useEffect(() => {
    fetchArtistPage();
  }, []);

  return <div>{artistsPage?.totalCount}</div>;
};
