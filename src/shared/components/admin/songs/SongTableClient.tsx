"use client";

import { Button, User as NextUiUser, Tooltip } from "@nextui-org/react";
import { type Song } from "@prisma/client";
import { type FC } from "react";
import { BiEdit } from "react-icons/bi";

import { type Pagination } from "@/core/models/pagination";
import { DateUtils } from "@/shared/utils/dateUtils";

import { AppTable, type TableColumn } from "../../AppTable";

const columns: readonly TableColumn<Song>[] = [
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
  { title: "URL", key: "songUrl", width: 200 },
  { title: "Duration", key: "duration", align: "end" },
  { title: "Playtime", key: "playTime", align: "end" },
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
  readonly page: Pagination<Song>;
};

export const SongsTableClient: FC<Props> = async ({ page }) => {
  return (
    <AppTable
      columns={columns}
      className="max-h-table"
      toKey={(item) => item.id}
      page={page}
    />
  );
};
