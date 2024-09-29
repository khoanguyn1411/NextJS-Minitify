"use client";

import { User as NextUiUser } from "@nextui-org/react";
import { type FC } from "react";
import { BiTime } from "react-icons/bi";

import { getSongs, type ISong } from "@/core/apis/songApis";
import { type BaseFilterParams } from "@/core/models/baseFilterParams";
import { type Pagination } from "@/core/models/pagination";
import { usePlayingSong } from "@/shared/hooks/usePlayingSong";
import { formatTime } from "@/shared/utils/formatTime";

import { ListView, type ListViewColumn } from "../ListView";

const columns: readonly ListViewColumn<ISong>[] = [
  {
    title: "#",
    key: "index",
    width: 50,
    toReadable: (_, index) => index,
    align: "center",
  },
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
  },
  {
    title: "Album",
    key: "album",
    toReadable: (item) => item.album?.name ?? "-",
  },
  {
    title: "Play time",
    key: "playTime",
    align: "center",
  },
  {
    title: <BiTime className="text-xl" />,
    key: "duration",
    align: "center",
    toReadable: (item) => formatTime(item.duration),
  },
];

type Props = {
  readonly page: Pagination<ISong>;
};

export const SongListView: FC<Props> = ({ page }) => {
  const { setPlayingSong } = usePlayingSong();
  const handleRowClick = (song: ISong) => {
    setPlayingSong(song);
  };

  const fetchFunction = (page: BaseFilterParams.Pagination) => {
    return getSongs({ ...page, search: "" });
  };

  return (
    <ListView
      onRowClick={handleRowClick}
      fetchApi={fetchFunction}
      gridTemplate="grid-cols-[40px_1fr_100px_200px_100px]"
      columns={columns}
      toKey={(item) => item.id}
      page={page}
    />
  );
};
