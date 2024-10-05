"use client";

import { useDisclosure } from "@nextui-org/react";
import { useMemo, useState, type FC } from "react";
import { BiTime } from "react-icons/bi";

import { type ISong } from "@/core/apis/songApis";
import { type BaseFilterParams } from "@/core/models/baseFilterParams";
import { type Pagination } from "@/core/models/pagination";
import {
  usePlayingSongStore,
  type BelongTo,
} from "@/shared/stores/usePlayingSongStore";
import { formatTime } from "@/shared/utils/formatTime";

import { ListView, type ListViewColumn } from "../ListView";
import { PlaylistsModal } from "../playlists/PlaylistsModal";
import { UserActionsButton } from "../UserActionsButton";
import { SongBaseInfoView } from "./SongBaseInfoView";

const baseColumns: ListViewColumn<ISong>[] = [
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
];

function getColumns(
  hoveredRow: ISong | null,
  activeRow: ISong | null,
  setActiveRow: (row: ISong | null) => void,
  openPlaylistModal: () => void,
): readonly ListViewColumn<ISong>[] {
  return [
    ...baseColumns,
    {
      title: <BiTime className="text-xl" />,
      key: "duration",
      align: "center",
      toReadable: (item) => formatTime(item.duration),
      render: (item) => {
        const isCurrentItemHovered =
          item.id === hoveredRow?.id || activeRow?.id === item.id;
        return (
          <>
            <UserActionsButton
              onPlaylistModalOpen={openPlaylistModal}
              isHidden={!isCurrentItemHovered}
              onDropdownTrigger={() => setActiveRow(item)}
              onDropdownClose={() => setActiveRow(null)}
            />
            <p className={isCurrentItemHovered ? "hidden" : ""}>
              {formatTime(item.duration)}
            </p>
          </>
        );
      },
    },
  ];
}

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
  const [hoveredRow, setHoveredRow] = useState<ISong | null>(null);
  const [activeRow, setActiveRow] = useState<ISong | null>(null);

  const playlistModalDisclosure = useDisclosure();

  const columns = useMemo(() => {
    return getColumns(
      hoveredRow,
      activeRow,
      setActiveRow,
      playlistModalDisclosure.onOpen,
    );
  }, [hoveredRow, activeRow]);

  const handleRowClick = (song: ISong) => {
    setPlayingSong(song);
    setBelongTo(belongTo);
  };

  const handleRowHover = (row: ISong) => {
    setHoveredRow(row);
  };

  const handleRowLeave = () => {
    setHoveredRow(null);
  };

  return (
    <>
      <ListView
        onRowDoubleClick={handleRowClick}
        onRowHover={handleRowHover}
        onRowLeave={handleRowLeave}
        fetchApi={fetchFunction}
        className={className}
        gridTemplate="grid-cols-[40px_1fr_100px_200px_100px]"
        columns={columns}
        toKey={(item) => item.id}
        page={page}
        isActiveRow={(currentSong) => playingSong?.id === currentSong.id}
        scrollableTargetId={scrollableTargetId}
      />

      {/* Note: Need to put the playlist modal outside of button component 
      to prevent clicking outside trigger the click action of row */}
      <PlaylistsModal currentSong={activeRow} {...playlistModalDisclosure} />
    </>
  );
};
