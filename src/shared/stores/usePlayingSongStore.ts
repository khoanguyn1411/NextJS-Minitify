import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  getSongs,
  increaseSongPlaytime,
  type ISong,
} from "@/core/apis/songApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";

export type BelongTo =
  | {
      readonly type: "playlist" | "album";
      readonly id: number;
    }
  | {
      readonly type: "discover";
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

  const setPlaylistSongToPlayByTurn = async (belongTo: BelongTo) => {
    if (belongTo?.type === "discover") {
      const songPages = await getSongs({
        ...BaseFilterParams.initialPagination,
        pageSize: 50,
        search: "",
      });
      setSongsToPlay(songPages.items);
    }
  };

  const moveToNextSong = () => {
    if (nextSongs[0] == null) {
      return;
    }
    setPlayingSong(nextSongs[0]);
  };

  useEffect(() => {
    setPlaylistSongToPlayByTurn(belongTo);
  }, [belongTo]);

  useEffect(() => {
    setCurrentSongsToPlayList(songsToPlay);
  }, [songsToPlay]);

  useEffect(() => {
    if (isShuffle) {
      setCurrentSongsToPlayList(shuffledList);
      return;
    }
    setCurrentSongsToPlayList(songsToPlay);
  }, [isShuffle]);

  return {
    nextSongs,
    moveToNextSong,

    playingSong,
    setPlayingSong,

    isShuffle,
    setIsShuffle,

    belongTo,
    setBelongTo,

    songsToPlay,
    setSongsToPlay,
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
  setIsShuffle: () => {},
  songsToPlay: [],
  setSongsToPlay: () => {},
  moveToNextSong: () => {},
});

/** Get current song. Only available with users app. */
export const usePlayingSongStore = () => {
  const value = useContext(PlayingSongContext);
  return value;
};
