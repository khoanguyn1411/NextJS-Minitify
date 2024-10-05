"use client";

import { User as NextUiUser, Tooltip } from "@nextui-org/react";
import { type FC } from "react";

import { type ISong } from "@/core/apis/songApis";
import { type Pagination } from "@/core/models/pagination";

import { AppTable, type TableColumn } from "../../AppTable";
import { SongActionsCell } from "./SongActionsCell";

const columns: readonly TableColumn<ISong>[] = [
  { title: "ID", key: "id" },
  {
    title: "Name",
    key: "name",
    render: (item) => (
      <NextUiUser
        avatarProps={{ radius: "full", src: item.imageUrl }}
        description={item.artists.map((artist) => artist.name).join(", ")}
        name={item.name}
      />
    ),
    width: 260,
  },
  {
    title: "Track",
    key: "songUrl",
    width: 200,
    render: (item) => {
      return (
        <audio controls>
          <source src={item.songUrl} />
        </audio>
      );
    },
  },
  { title: "Play count", key: "playTime", align: "end" },
  {
    title: "Album",
    key: "album",
    render: (item) => (
      <Tooltip content={item.album?.name}>
        <p className="truncate-2">{item.album?.name ?? "-"}</p>
      </Tooltip>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    width: 50,
    align: "center",
    render: (item) => <SongActionsCell song={item} />,
  },
];

type Props = {
  readonly page: Pagination<ISong>;
};

export const SongsTableClient: FC<Props> = ({ page }) => {
  return (
    <AppTable
      columns={columns}
      className="max-h-table"
      toKey={(item) => item.id.toString()}
      page={page}
    />
  );
};
