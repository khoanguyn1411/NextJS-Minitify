"use client";

import { type FC } from "react";

import { type ITag } from "@/core/apis/tagApis";
import { type Pagination } from "@/core/models/pagination";

import { AppTable, type TableColumn } from "../../AppTable";
import { TagActionsCell } from "./TagActionsCell";

const columns: readonly TableColumn<ITag>[] = [
  { title: "ID", key: "id" },
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Song count",
    key: "_count",
    toReadable: (item) => item._count.songs,
  },
  {
    title: "Actions",
    key: "actions",
    align: "center",
    width: 50,
    render: (item) => <TagActionsCell tag={item} />,
  },
];

type Props = {
  readonly page: Pagination<ITag>;
};

export const TagsTableClient: FC<Props> = ({ page }) => {
  return (
    <AppTable
      columns={columns}
      className="max-h-table"
      toKey={(item) => item.id}
      page={page}
    />
  );
};
