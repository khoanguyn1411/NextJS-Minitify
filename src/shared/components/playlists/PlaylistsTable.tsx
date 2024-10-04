import { type User } from "lucia";
import { type FC } from "react";

import { type IPlaylist } from "@/core/apis/playlistApis";
import { type Pagination } from "@/core/models/pagination";

import { AppTable, type TableColumn } from "../AppTable";

type Props = {
  readonly playlistsPage: Pagination<IPlaylist>;
  readonly userId: User["id"] | null;
};

const baseColumns: TableColumn<IPlaylist>[] = [
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Description",
    key: "description",
  },
];

export const PlaylistsTable: FC<Props> = ({ playlistsPage }) => {
  return (
    <AppTable
      className="max-h-[200px]"
      hasPagination={false}
      columns={baseColumns}
      toKey={(item) => item.id}
      selectionMode="multiple"
      page={playlistsPage}
    />
  );
};
