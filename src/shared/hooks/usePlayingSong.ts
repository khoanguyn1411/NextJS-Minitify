import { createContext, useContext } from "react";

import { increaseSongPlaytime, type ISong } from "@/core/apis/songApis";

export type BelongTo =
  | {
      readonly type: "playlist" | "album";
      readonly id: number;
    }
  | {
      readonly type: "discover";
    }
  | null;

export const PlayingSongContext = createContext<{
  playingSong: ISong | null;
  belongTo: BelongTo;
  isShuffle: boolean;
  songsToPlay: readonly ISong[];
  setSongsToPlay: (param: readonly ISong[] | ISong[]) => void;
  setPlayingSong: (playingSong: ISong) => void;
  setBelongTo: (belongTo: BelongTo) => void;
  setIsShuffle: (isShuffle: boolean) => void;
}>({
  playingSong: null,
  setPlayingSong: () => {},
  belongTo: null,
  setBelongTo: () => {},
  isShuffle: false,
  setIsShuffle: () => {},
  songsToPlay: [],
  setSongsToPlay: () => {},
});

/** Get current song. Only available with users app. */
export const usePlayingSong = () => {
  const {
    playingSong,
    belongTo,
    setPlayingSong: setInitSong,
    setBelongTo,
    setIsShuffle,
    setSongsToPlay,
    songsToPlay,
  } = useContext(PlayingSongContext);

  const setPlayingSong = (song: ISong) => {
    // No need to use async, since we can run it in parallel.
    increaseSongPlaytime(song.id);
    setInitSong(song);
  };

  return {
    playingSong,
    songsToPlay,
    belongTo,
    setSongsToPlay,
    setPlayingSong,
    setBelongTo,
    setIsShuffle,
  };
};
