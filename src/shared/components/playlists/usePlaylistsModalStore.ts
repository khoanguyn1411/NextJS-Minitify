import { type User } from "lucia";
import { createContext, useContext, useEffect, useState } from "react";

import { type IPlaylist, getPlaylists } from "@/core/apis/playlistApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { type Pagination } from "@/core/models/pagination";
import { useToggleExecutionState } from "@/shared/hooks/useToggleExecutionState";

export type PlaylistMode = "view" | "create" | "loading";

type Params = {
  readonly userId: User["id"] | null;
};

export const usePlaylistsModalContext = ({ userId }: Params) => {
  const [playlistsPage, setPlaylistsPage] =
    useState<Pagination<IPlaylist> | null>(null);

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
        pageSize: 500,
        search: "",
      });
      setPlaylistsPage(page);
    });
  };

  useEffect(() => {
    fetchPage();
  }, []);

  useEffect(() => {
    setMode(getMode());
  }, [playlistsPage, isLoading]);

  return {
    isLoading,
    playlistsPage,
    fetchPage,
    mode,
    userId,
    setMode,
  };
};

export const PlaylistsModalContext = createContext<
  ReturnType<typeof usePlaylistsModalContext>
>({
  isLoading: false,
  playlistsPage: null,
  fetchPage: () => Promise.resolve(),
  setMode: () => {},
  mode: "loading",
  userId: null,
});

export const usePlaylistsModalStore = () => {
  const value = useContext(PlaylistsModalContext);
  return value;
};
