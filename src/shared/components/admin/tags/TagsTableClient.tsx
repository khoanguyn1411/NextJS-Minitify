"use client";

import { type FC } from "react";

import { type ITag } from "@/core/apis/tagApis";
import { type Pagination } from "@/core/models/pagination";

import { AppTable, type TableColumn } from "../../AppTable";
import { TagEditButton } from "./TagEditButton";

const columns: readonly TableColumn<ITag>[] = [
  { title: "ID", key: "id" },
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Song count",
    key: "_count",
  },
  {
    title: "Edit",
    key: "edit",
    width: 50,
    render: (item) => <TagEditButton tag={item} />,
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
