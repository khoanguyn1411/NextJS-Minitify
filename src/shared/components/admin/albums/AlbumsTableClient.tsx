"use client";

import { User as NextUiUser, Tooltip } from "@nextui-org/react";
import { type FC } from "react";

import { type IAlbum } from "@/core/apis/albumsApis";
import { type Pagination } from "@/core/models/pagination";
import { DateUtils } from "@/shared/utils/dateUtils";

import { AppTable, type TableColumn } from "../../AppTable";
import { AlbumEditButton } from "./AlbumEditButton";

const columns: readonly TableColumn<IAlbum>[] = [
  { title: "ID", key: "id" },
  {
    title: "Name",
    key: "name",
    render: (item) => (
      <NextUiUser
        avatarProps={{ radius: "full", src: item.imageUrl }}
        description={`Last updated: ${DateUtils.toReadable(item.updatedAt)}`}
        name={item.name}
      />
    ),
    width: 220,
  },
  {
    title: "Description",
    key: "description",
    render: (item) => (
      <Tooltip
        className="max-w-48 overflow-auto max-h-40"
        content={item.description}
      >
        <p className="truncate-2">{item.description}</p>
      </Tooltip>
    ),
  },
  { title: "Play count", key: "playTime", align: "end" },
  { title: "Song count", key: "songCount", align: "end" },
  {
    title: "Created date",
    key: "createdDate",
    toReadable: (item) => DateUtils.toReadable(item.createdDate),
  },
  {
    title: "Edit",
    key: "edit",
    width: 50,
    render: (item) => <AlbumEditButton album={item} />,
  },
];

type Props = {
  readonly page: Pagination<IAlbum>;
};

export const AlbumsTableClient: FC<Props> = ({ page }) => {
  return (
    <AppTable
      columns={columns}
      className="max-h-table"
      toKey={(item) => item.id}
      page={page}
    />
  );
};
