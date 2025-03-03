import { type useDisclosure } from "@nextui-org/react";
import { type User } from "lucia";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { type IPlaylist, getPlaylists } from "@/core/apis/playlistApis";
import { type ISong } from "@/core/apis/songApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { type Pagination } from "@/core/models/pagination";
import { useToggleExecutionState } from "@/shared/hooks/useToggleExecutionState";

export type PlaylistMode = "view" | "create" | "loading";

type Params = {
  readonly userId: User["id"] | null;
  readonly currentSong: ISong | null;
} & ReturnType<typeof useDisclosure>;

export const usePlaylistsModalContext = ({
  userId,
  currentSong,
  isOpen,
}: Params) => {
  const [playlistsPage, setPlaylistsPage] =
    useState<Pagination<IPlaylist> | null>(null);

  const [rawSelectedPlaylists, setSelectedPlaylists] = useState<
    readonly string[]
  >([]);

  const [rawOriginalSelectedPlaylists, setOriginalSelectedPlaylists] = useState<
    readonly string[]
  >([]);

  const originalSelectedPlaylists = useMemo(() => {
    return rawSelectedPlaylists.map((playlistId) => Number(playlistId));
  }, [rawOriginalSelectedPlaylists]);

  const selectedPlaylists = useMemo(() => {
    return rawSelectedPlaylists.map((playlistId) => Number(playlistId));
  }, [rawSelectedPlaylists]);

  const [isLoading, toggleExecutionState] = useToggleExecutionState();

  const getMode = () => {
    if (playlistsPage == null || isLoading) {
      return "loading";
    }
    if (playlistsPage.items.length == 0) {
      return "create";
    }
    return "view";
  };

  const [mode, setMode] = useState<PlaylistMode>(getMode);

  const fetchPage = async () => {
    toggleExecutionState(async () => {
      const page = await getPlaylists({
        ...BaseFilterParams.initialPagination,
        pageSize: 99999,
        search: "",
        userId: userId ?? undefined,
        songIdIncluded: currentSong?.id,
      });
      setPlaylistsPage(page);
    });
  };

  const resetMode = () => {
    setMode(getMode());
  };

  useEffect(() => {
    if (isOpen) {
      fetchPage();
    }
  }, [currentSong, isOpen, userId]);

  useEffect(() => {
    resetMode();
    if (playlistsPage == null) {
      return;
    }
    const originalSelectedPlaylist = playlistsPage.items
      .filter((item) => item.isSongIncludedIn)
      .map((item) => item.id.toString());

    setOriginalSelectedPlaylists(originalSelectedPlaylist);
    setSelectedPlaylists(originalSelectedPlaylist);
  }, [playlistsPage, isLoading]);

  return {
    isLoading,
    playlistsPage,
    fetchPage,
    mode,
    userId,
    setMode,
    selectedPlaylists,
    rawSelectedPlaylists,
    setSelectedPlaylists,
    resetMode,
    currentSong,
    originalSelectedPlaylists,
  };
};

export const PlaylistsModalContext = createContext<
  ReturnType<typeof usePlaylistsModalContext>
>({
  isLoading: false,
  playlistsPage: null,
  fetchPage: () => Promise.resolve(),
  setMode: () => {},
  setSelectedPlaylists: () => {},
  resetMode: () => {},
  mode: "loading",
  userId: null,
  selectedPlaylists: [],
  originalSelectedPlaylists: [],
  rawSelectedPlaylists: [],
  currentSong: null,
});

export const usePlaylistsModalStore = () => {
  const value = useContext(PlaylistsModalContext);
  return value;
};
