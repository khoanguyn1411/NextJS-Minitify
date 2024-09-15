"use client";

import { Tooltip } from "@nextui-org/react";
import { type Artist } from "@prisma/client";
import { useEffect, useState, type FC } from "react";

import { getArtists } from "@/core/apis/artistApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { type Pagination } from "@/core/models/pagination";
import { User } from "@/core/models/user";
import { useToggleExecutionState } from "@/shared/hooks/useToggleExecutionState";
import { DateUtils } from "@/shared/utils/dateUtils";

import { AppImage } from "../AppImage";
import { AppTable, type TableColumn } from "../AppTable";

const columns: readonly TableColumn<Artist>[] = [
  { title: "ID", key: "id" },
  { title: "First name", key: "firstName" },
  { title: "Last name", key: "lastName" },
  {
    title: "Biography",
    key: "biography",
    render: (item) => (
      <Tooltip content={item.biography}>
        <p className="truncate-2">{item.biography}</p>
      </Tooltip>
    ),
  },
  { title: "Songs", key: "songCount", align: "end" },
  {
    title: "Image",
    key: "imageUrl",
    render: (item) => (
      <AppImage
        height={60}
        width={60}
        className="object-cover rounded-full"
        src={item.imageUrl}
        alt={User.getFullName(item)}
      />
    ),
    width: 150,
    align: "center",
  },
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
