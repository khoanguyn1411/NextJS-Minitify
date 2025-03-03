"use client";

import { useEffect, useState, type FC } from "react";

import { SongBaseInfoView } from "@/shared/components/items-view/SongBaseInfoView";
import { usePlayingSongStore } from "@/shared/stores/usePlayingSongStore";

import { AudioControl } from "./AudioControl";
import { VolumeSettings } from "./VolumeSettings";

export type AudioStatus = "playing" | "paused";
export type VolumeSetting = { prev: number; current: number };

export const Footer: FC = () => {
  const { playingSong } = usePlayingSongStore();
  const [isSpinning, setIsSpinning] = useState(false);
  const [audioStatus, setAudioStatus] = useState<AudioStatus>("playing");
  const [volume, setVolume] = useState<VolumeSetting>({
    prev: 50,
    current: 50,
  });

  const handleResetSpinner = () => {
    setIsSpinning(false); // Stop the animation briefly to reset
    setTimeout(() => {
      setIsSpinning(true); // Restart the animation
    }, 0); // Use a timeout of 0 to restart the animation immediately
  };

  useEffect(() => {
    if (audioStatus === "paused") {
      setIsSpinning(false);
      return;
    }
    setIsSpinning(true);
  }, [audioStatus]);

  useEffect(() => {
    if (playingSong != null) {
      handleResetSpinner();
    }
  }, [playingSong]);

  if (playingSong == null) {
    return (
      <div className="flex items-center h-full justify-center">
        <p>Select a song to play</p>
      </div>
    );
  }

  return (
    <div className="flex-col gap-2 grid grid-cols-3 items-center">
      <div>
        <SongBaseInfoView song={playingSong} isSpinning={isSpinning} />
      </div>
      <AudioControl
        song={playingSong}
        audioStatus={audioStatus}
        setAudioStatus={setAudioStatus}
        volume={volume}
        setVolume={setVolume}
      />
      <div className="flex justify-end">
        <VolumeSettings volume={volume} setVolume={setVolume} />
      </div>
    </div>
  );
};
