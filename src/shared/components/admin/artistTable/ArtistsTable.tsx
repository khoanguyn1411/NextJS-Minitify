"use client";

import { Button, User as NextUiUser, Tooltip } from "@nextui-org/react";
import { type Artist } from "@prisma/client";
import { useEffect, useState, type FC } from "react";
import { BiEdit } from "react-icons/bi";

import { getArtists } from "@/core/apis/artistApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { type Pagination } from "@/core/models/pagination";
import { User } from "@/core/models/user";
import { useToggleExecutionState } from "@/shared/hooks/useToggleExecutionState";
import { DateUtils } from "@/shared/utils/dateUtils";

import { AppTable, type TableColumn } from "../../AppTable";

const columns: readonly TableColumn<Artist>[] = [
  { title: "ID", key: "id" },
  {
    title: "Artist",
    key: "artist",
    render: (item) => (
      <NextUiUser
        avatarProps={{ radius: "lg", src: item.imageUrl }}
        description={`Last updated: ${DateUtils.toReadable(item.updatedAt)}`}
        name={User.getFullName(item)}
      />
    ),
    width: 220,
  },
  {
    title: "Biography",
    key: "biography",
    render: (item) => (
      <Tooltip
        className="max-w-48 overflow-auto max-h-40"
        content={item.biography}
      >
        <p className="truncate-2">{item.biography}</p>
      </Tooltip>
    ),
  },
  { title: "Songs", key: "songCount", align: "end" },
  {
    title: "Created date",
    key: "createdDate",
    toReadable: (item) => DateUtils.toReadable(item.createdDate),
  },
  {
    title: "Edit",
    key: "edit",
    render: () => (
      <Tooltip content="Edit">
        <Button variant="flat" size="sm" color="primary" isIconOnly>
          <BiEdit className="text-lg" />
        </Button>
      </Tooltip>
    ),
  },
];

type Props = {
  readonly searchValue: string;
};

export const ArtistsTable: FC<Props> = ({ searchValue }) => {
  const [isLoading, toggleExecutionState] = useToggleExecutionState();
  const [artistsPage, setArtistsPage] = useState<Pagination<Artist> | null>(
    null,
  );
  const [pagination, setPagination] = useState<BaseFilterParams.Combined>({
    ...BaseFilterParams.initialPagination,
    search: "",
  });

  const fetchArtistPage = async (filters: BaseFilterParams.Combined) => {
    toggleExecutionState(async () => {
      const page = await getArtists(filters);
      setArtistsPage(page);
    });
  };

  const handlePaginationChange = (page: number) => {
    setPagination((prev) => ({ ...prev, pageNumber: page }));
  };

  useEffect(() => {
    fetchArtistPage({ ...pagination, search: searchValue });
  }, [pagination, searchValue]);

  if (artistsPage?.items == null) {
    return <div>No data available.</div>;
  }

  return (
    <AppTable
      onPaginationChange={handlePaginationChange}
      columns={columns}
      className="max-h-table"
      isLoading={isLoading}
      toKey={(item) => item.id}
      paginationOptions={BaseFilterParams.initialPagination}
      page={artistsPage}
    />
  );
};
