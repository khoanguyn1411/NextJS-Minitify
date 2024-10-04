import { useEffect, useState } from "react";

import { type IPlaylist, getPlaylists } from "@/core/apis/playlistApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { type Pagination } from "@/core/models/pagination";
import { useToggleExecutionState } from "@/shared/hooks/useToggleExecutionState";

export const usePlaylistData = () => {
  const [playlistsPage, setPlaylistsPage] =
    useState<Pagination<IPlaylist> | null>(null);

  const [isLoading, toggleExecutionState] = useToggleExecutionState();

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
  return {
    isLoading,
    playlistsPage,
    fetchPage,
  };
};
