import { type FC } from "react";

import { type IPlaylist } from "@/core/apis/playlistApis";
import { type Pagination } from "@/core/models/pagination";

import { AppTable, type TableColumn } from "../AppTable";

type Props = {
  readonly playlistsPage: Pagination<IPlaylist>;
  readonly selections?: readonly string[];
  readonly setSections?: (selections: readonly string[]) => void;
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

export const PlaylistsTable: FC<Props> = ({
  playlistsPage,
  selections,
  setSections,
}) => {
  return (
    <AppTable
      selections={selections}
      onSelectionChange={setSections}
      className="max-h-[200px]"
      hasPagination={false}
      columns={baseColumns}
      toKey={(item) => item.id.toString()}
      selectionMode="multiple"
      page={playlistsPage}
    />
  );
};
