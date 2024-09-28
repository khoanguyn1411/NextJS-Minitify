import { createContext, useContext } from "react";

import { type ISong } from "@/core/apis/songApis";
export const PlayingSongContext = createContext<{
  playingSong: ISong | null;
  setPlayingSong: (playingSong: ISong) => void;
}>({ playingSong: null, setPlayingSong: () => {} });

/** Get current song. Only available with users app. */
export const usePlayingSong = () => {
  const { playingSong, setPlayingSong } = useContext(PlayingSongContext);
  return {
    playingSong,
    setPlayingSong,
  };
};
