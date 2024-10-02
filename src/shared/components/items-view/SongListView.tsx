"use client";

import { type FC } from "react";
import { BiTime } from "react-icons/bi";

import { type ISong } from "@/core/apis/songApis";
import { type BaseFilterParams } from "@/core/models/baseFilterParams";
import { type Pagination } from "@/core/models/pagination";
import {
  type BelongTo,
  usePlayingSongStore,
} from "@/shared/stores/usePlayingSongStore";
import { formatTime } from "@/shared/utils/formatTime";

import { ListView, type ListViewColumn } from "../ListView";
import { SongBaseInfoView } from "./SongBaseInfoView";

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
    render: (item) => <SongBaseInfoView song={item} />,
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
  readonly belongTo: BelongTo;
  readonly className?: string;
  readonly fetchFunction: (
    pageNumber: BaseFilterParams.Pagination["pageNumber"],
  ) => Promise<Pagination<ISong>>;
  readonly scrollableTargetId?: string;
};

export const SongListView: FC<Props> = ({
  page,
  belongTo,
  className,
  fetchFunction,
  scrollableTargetId,
}) => {
  const { setPlayingSong, playingSong, setBelongTo } = usePlayingSongStore();

  const handleRowClick = (song: ISong) => {
    setPlayingSong(song);
    setBelongTo(belongTo);
  };

  return (
    <ListView
      onRowClick={handleRowClick}
      fetchApi={fetchFunction}
      className={className}
      gridTemplate="grid-cols-[40px_1fr_100px_200px_100px]"
      columns={columns}
      toKey={(item) => item.id}
      page={page}
      isActiveRow={(currentSong) => playingSong?.id === currentSong.id}
      scrollableTargetId={scrollableTargetId}
    />
  );
};
