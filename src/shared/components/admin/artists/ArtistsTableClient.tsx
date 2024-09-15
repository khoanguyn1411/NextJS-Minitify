"use client";

import { Button, User as NextUiUser, Tooltip } from "@nextui-org/react";
import { type Artist } from "@prisma/client";
import { type FC } from "react";
import { BiEdit } from "react-icons/bi";

import { type Pagination } from "@/core/models/pagination";
import { User } from "@/core/models/user";
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
  readonly page: Pagination<Artist>;
};

export const ArtistsTableClient: FC<Props> = async ({ page }) => {
  return (
    <AppTable
      columns={columns}
      className="max-h-table"
      toKey={(item) => item.id}
      page={page}
    />
  );
};
