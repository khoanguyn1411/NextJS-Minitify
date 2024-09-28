"use client";

import { User } from "@nextui-org/react";
import classNames from "classnames";
import { useEffect, useState, type FC } from "react";

import { usePlayingSong } from "@/shared/hooks/usePlayingSong";

import { AudioControl } from "./AudioControl";

export type AudioStatus = "playing" | "paused";

export const Footer: FC = () => {
  const { playingSong } = usePlayingSong();
  const [isSpinning, setIsSpinning] = useState(false);
  const [audioStatus, setAudioStatus] = useState<AudioStatus>("playing");

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
        <User
          name={playingSong.name}
          description={playingSong.artists
            .map((artist) => artist.name)
            .join(", ")}
          avatarProps={{
            src: playingSong.imageUrl,
            className: classNames(isSpinning ? "animate-spin" : ""),
          }}
        />
      </div>
      <AudioControl
        song={playingSong}
        audioStatus={audioStatus}
        setAudioStatus={setAudioStatus}
      />
      <div className="flex justify-end">Test</div>
    </div>
  );
};
