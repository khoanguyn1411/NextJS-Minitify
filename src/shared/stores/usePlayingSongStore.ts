import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  getSongs,
  increaseSongPlaytime,
  type ISong,
} from "@/core/apis/songApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { type SongsFilterParams } from "@/core/models/songsFilterParams";

export type BelongTo =
  | {
      readonly type: "playlist" | "album" | "artist";
      readonly id: number;
    }
  | {
      readonly type: "discover" | "trending";
    }
  | null;

function shuffleSongsKeepFirst(
  array: readonly ISong[],
  firstValue: ISong,
): ISong[] {
  const filteredArray = array.filter((item) => item.id !== firstValue.id); // Remove the firstValue from the array
  const shuffledArray = [...filteredArray]; // Create a copy of the filtered array to shuffle

  // Shuffle the rest of the array (excluding the firstValue)
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return [...shuffledArray]; // Add firstValue to the start of the shuffled array
}

const baseFilters: BaseFilterParams.Combined = {
  ...BaseFilterParams.initialPagination,
  pageSize: 50,
  search: "",
};

export const usePlayingSongContext = () => {
  const [playingSong, _setPlayingSong] = useState<ISong | null>(null);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [belongTo, setBelongTo] = useState<BelongTo>(null);
  const [songsToPlay, setSongsToPlay] = useState<readonly ISong[]>([]);
  const [currentSongsToPlayList, setCurrentSongsToPlayList] = useState<
    readonly ISong[]
  >([]);

  const setPlayingSong = (song: ISong) => {
    // No need to use async, since we can run it in parallel.
    increaseSongPlaytime(song.id);
    _setPlayingSong(song);
  };

  const previousSongs = useMemo(() => {
    const currentSongIndex = currentSongsToPlayList.findIndex(
      (song) => song.id === playingSong?.id,
    );
    return currentSongsToPlayList.slice(0, currentSongIndex);
  }, [playingSong, currentSongsToPlayList]);

  const nextSongs = useMemo(() => {
    const currentSongIndex = currentSongsToPlayList.findIndex(
      (song) => song.id === playingSong?.id,
    );
    return currentSongsToPlayList.slice(currentSongIndex + 1);
  }, [playingSong, currentSongsToPlayList]);

  const shuffledList = useMemo(() => {
    if (playingSong == null) {
      return [];
    }
    return shuffleSongsKeepFirst(songsToPlay, playingSong);
  }, [songsToPlay, isShuffle]);

  const getAndSetSongsToPlay = async (filters: Partial<SongsFilterParams>) => {
    const songPages = await getSongs({
      ...baseFilters,
      ...filters,
    });
    setSongsToPlay(songPages.items);
  };

  const fetchSongsToPlays = async (belongTo: BelongTo) => {
    if (belongTo == null) {
      return;
    }
    switch (belongTo.type) {
      case "discover":
        getAndSetSongsToPlay(baseFilters);
        break;
      case "artist":
        getAndSetSongsToPlay({
          artistIds: [belongTo.id],
        });
        break;
      case "playlist":
        getAndSetSongsToPlay({
          pageSize: 999999,
          playlistId: belongTo.id,
        });
        break;
      case "trending":
        getAndSetSongsToPlay({
          sortOptions: {
            playTime: "desc",
          },
        });
        break;
      case "album":
        getAndSetSongsToPlay({
          albumId: belongTo.id,
        });
        break;
    }
  };

  const moveToNextSong = () => {
    if (nextSongs[0] == null) {
      return;
    }
    setPlayingSong(nextSongs[0]);
  };

  const moveToPreviousSong = () => {
    const previousSong = previousSongs.at(-1);
    if (previousSong == null) {
      return;
    }
    setPlayingSong(previousSong);
  };

  const toggleShuffle = () => {
    if (isShuffle) {
      setIsShuffle(false);
      setCurrentSongsToPlayList(songsToPlay);
      return;
    }
    setIsShuffle(true);
    setCurrentSongsToPlayList(shuffledList);
  };

  useEffect(() => {
    fetchSongsToPlays(belongTo);
  }, [belongTo]);

  useEffect(() => {
    setCurrentSongsToPlayList(songsToPlay);
  }, [songsToPlay]);

  return {
    nextSongs,
    moveToNextSong,
    moveToPreviousSong,

    playingSong,
    setPlayingSong,

    isShuffle,
    toggleShuffle,

    belongTo,
    setBelongTo,
  };
};

export const PlayingSongContext = createContext<
  ReturnType<typeof usePlayingSongContext>
>({
  nextSongs: [],
  playingSong: null,
  setPlayingSong: () => {},
  belongTo: null,
  setBelongTo: () => {},
  isShuffle: false,
  toggleShuffle: () => {},
  moveToNextSong: () => {},
  moveToPreviousSong: () => {},
});

/** Get current song. Only available with users app. */
export const usePlayingSongStore = () => {
  const value = useContext(PlayingSongContext);
  return value;
};
