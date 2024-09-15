"use client";

import { type Artist } from "@prisma/client";
import { useEffect, useState, type FC } from "react";

import { getArtists } from "@/core/apis/artistApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { type Pagination } from "@/core/models/pagination";
import { useToggleExecutionState } from "@/shared/hooks/useToggleExecutionState";
import { DateUtils } from "@/shared/utils/dateUtils";

import { AppTable, type TableColumn } from "../AppTable";

const columns: readonly TableColumn<Artist>[] = [
  { title: "ID", key: "id" },
  { title: "First name", key: "firstName" },
  { title: "Last name", key: "lastName" },
  { title: "Biography", key: "biography" },
  { title: "Songs", key: "songCount" },
  { title: "Image", key: "imageUrl" },
  {
    title: "Created date",
    key: "createdDate",
    toReadable: (item) => DateUtils.toReadable(item.createdDate),
  },
];

export const ArtistsTable: FC = () => {
  const [isLoading, toggleExecutionState] = useToggleExecutionState();
  const [artistsPage, setArtistsPage] = useState<Pagination<Artist> | null>(
    null,
  );

  const fetchArtistPage = async () => {
    toggleExecutionState(async () => {
      const page = await getArtists(BaseFilterParams.initialPagination);
      setArtistsPage(page);
    });
  };

  useEffect(() => {
    fetchArtistPage();
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (artistsPage?.items == null) {
    return <div>No data available.</div>;
  }

  return (
    <AppTable
      columns={columns}
      toKey={(item) => item.id}
      paginationOptions={BaseFilterParams.initialPagination}
      items={artistsPage.items}
    />
  );
};
