"use client";

import { User as NextUiUser, Tooltip } from "@nextui-org/react";
import { type Artist } from "@prisma/client";
import { type FC } from "react";

import { type IArtist } from "@/core/apis/artistApis";
import { type Pagination } from "@/core/models/pagination";
import { DateUtils } from "@/shared/utils/dateUtils";

import { AppTable, type TableColumn } from "../../AppTable";
import { ArtistEditButton } from "./ArtistEditButton";

const columns: readonly TableColumn<Artist>[] = [
  { title: "ID", key: "id" },
  {
    title: "Artist",
    key: "artist",
    render: (item) => (
      <NextUiUser
        avatarProps={{ radius: "lg", src: item.imageUrl }}
        description={`Last updated: ${DateUtils.toReadable(item.updatedAt)}`}
        name={item.name}
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
    render: (item) => <ArtistEditButton artist={item} />,
  },
];

type Props = {
  readonly page: Pagination<IArtist>;
};

export const ArtistsTableClient: FC<Props> = ({ page }) => {
  return (
    <AppTable
      columns={columns}
      className="max-h-table"
      toKey={(item) => item.id}
      page={page}
    />
  );
};
