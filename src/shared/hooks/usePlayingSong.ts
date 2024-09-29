import { createContext, useContext } from "react";

import { increaseSongPlaytime, type ISong } from "@/core/apis/songApis";
export const PlayingSongContext = createContext<{
  playingSong: ISong | null;
  setPlayingSong: (playingSong: ISong) => void;
}>({ playingSong: null, setPlayingSong: () => {} });

/** Get current song. Only available with users app. */
export const usePlayingSong = () => {
  const { playingSong, setPlayingSong: setInitSong } =
    useContext(PlayingSongContext);

  const setPlayingSong = (song: ISong) => {
    // No need to use async, since we can run it in parallel.
    increaseSongPlaytime(song.id);
    setInitSong(song);
  };

  return {
    playingSong,
    setPlayingSong,
  };
};
