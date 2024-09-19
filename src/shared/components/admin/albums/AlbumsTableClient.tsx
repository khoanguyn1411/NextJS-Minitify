"use client";

import { Button, User as NextUiUser, Tooltip } from "@nextui-org/react";
import { type Album } from "@prisma/client";
import { type FC } from "react";
import { BiEdit } from "react-icons/bi";

import { type Pagination } from "@/core/models/pagination";
import { DateUtils } from "@/shared/utils/dateUtils";

import { AppTable, type TableColumn } from "../../AppTable";

const columns: readonly TableColumn<Album>[] = [
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
  { title: "Play times", key: "playTime", align: "end" },
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
  readonly page: Pagination<Album>;
};

export const AlbumsTableClient: FC<Props> = async ({ page }) => {
  return (
    <AppTable
      columns={columns}
      className="max-h-table"
      toKey={(item) => item.id}
      page={page}
    />
  );
};
