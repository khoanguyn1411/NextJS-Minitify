"use client";

import { User as NextUiUser, Tooltip } from "@nextui-org/react";
import { type FC } from "react";

import { type ISong } from "@/core/apis/songApis";
import { type Pagination } from "@/core/models/pagination";
import { DateUtils } from "@/shared/utils/dateUtils";

import { AppTable, type TableColumn } from "../../AppTable";
import { SongEditButton } from "./SongEditButton";

const columns: readonly TableColumn<ISong>[] = [
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
  {
    title: "Artist",
    key: "artists",
    render: (item) => (
      <span>{item.artists.map((artist) => artist.name).join(", ")}</span>
    ),
  },
  { title: "Play count", key: "playTime", align: "end" },
  {
    title: "Album",
    key: "album",
    render: (item) => (
      <Tooltip content={item.album?.name}>
        <p className="truncate-1">{item.album?.name ?? "-"}</p>
      </Tooltip>
    ),
  },
  {
    title: "Edit",
    key: "edit",
    width: 50,
    render: (item) => <SongEditButton song={item} />,
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
      toKey={(item) => item.id}
      page={page}
    />
  );
};
