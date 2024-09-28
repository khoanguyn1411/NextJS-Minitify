"use client";

import { Button } from "@nextui-org/button";
import { User } from "@nextui-org/react";
import classNames from "classnames";
import { useEffect, useState, type FC } from "react";
import {
  BiArrowFromRight,
  BiArrowToRight,
  BiPauseCircle,
  BiPlayCircle,
  BiRepeat,
  BiShuffle,
} from "react-icons/bi";

import { usePlayingSong } from "@/shared/hooks/usePlayingSong";

import { AudioPlay } from "./AudioPlay";

export type AudioStatus = "playing" | "paused";

export const Footer: FC = () => {
  const { playingSong } = usePlayingSong();
  const [isSpinning, setIsSpinning] = useState(false);
  const [audioStatus, setAudioStatus] = useState<AudioStatus>("playing");

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Format time in mm:ss format
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleResetSpinner = () => {
    setIsSpinning(false); // Stop the animation briefly to reset
    setTimeout(() => {
      setIsSpinning(true); // Restart the animation
    }, 0); // Use a timeout of 0 to restart the animation immediately
  };

  const toggleAudioStatus = () => {
    setAudioStatus((status) => {
      if (status === "playing") {
        return "paused";
      }
      return "playing";
    });
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
    return <p>Select a song to play.</p>;
  }
  return (
    <div className="flex-col gap-2 grid grid-cols-3 items-center">
      <div>
        <User
          name={playingSong.name}
          description={playingSong.artists.map((artist) => artist.name)}
          avatarProps={{
            src: playingSong.imageUrl,
            className: classNames(isSpinning ? "animate-spin" : ""),
          }}
        />
      </div>
      <div className="flex justify-center flex-col">
        <div className="flex items-center w-full gap-2">
          <p className="text-xs">{formatTime(currentTime)}</p>
          <AudioPlay
            audioStatus={audioStatus}
            song={playingSong}
            setAudioStatus={setAudioStatus}
            duration={duration}
            setDuration={setDuration}
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
          />
          <p className="text-xs">{formatTime(duration)}</p>
        </div>
        <div className="flex w-full h-full items-center justify-center">
          <Button
            isIconOnly
            className="data-[hover]:bg-foreground/10"
            radius="full"
            variant="light"
          >
            <BiRepeat className="text-lg" />
          </Button>
          <Button
            isIconOnly
            className="data-[hover]:bg-foreground/10"
            radius="full"
            variant="light"
          >
            <BiArrowFromRight className="text-lg" />
          </Button>
          <Button
            isIconOnly
            onClick={toggleAudioStatus}
            className="data-[hover]:bg-foreground/10"
            radius="full"
            variant="light"
          >
            {audioStatus === "paused" ? (
              <BiPlayCircle className="text-3xl" />
            ) : (
              <BiPauseCircle className="text-3xl" />
            )}
          </Button>
          <Button
            isIconOnly
            className="data-[hover]:bg-foreground/10"
            radius="full"
            variant="light"
          >
            <BiArrowToRight className="text-lg" />
          </Button>
          <Button
            isIconOnly
            className="data-[hover]:bg-foreground/10"
            radius="full"
            variant="light"
          >
            <BiShuffle className="text-lg" />
          </Button>
        </div>
      </div>
      <div className="flex justify-end">Test</div>
    </div>
  );
};
