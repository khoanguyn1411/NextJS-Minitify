import { Slider } from "@nextui-org/react";
import { useEffect, useRef, useState, type FC } from "react";

import { type ISong } from "@/core/apis/songApis";

import { type AudioStatus } from "./Footer";

type Props = {
  readonly song: ISong;
  readonly audioStatus: AudioStatus;
  readonly setAudioStatus: (status: AudioStatus) => void;

  readonly duration: number;
  readonly setDuration: (time: number) => void;

  readonly currentTime: number;
  readonly setCurrentTime: (time: number) => void;
};

export const AudioPlay: FC<Props> = ({
  song,
  audioStatus,
  setAudioStatus,
  setCurrentTime,
  duration,
  setDuration,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);

  // Update progress as the song plays
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const totalDuration = audioRef.current.duration;
      setProgress((currentTime / totalDuration) * 100); // Update progress percentage
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // When the audio is loaded, set the duration
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Function to seek the audio position when progress bar is clicked
  const handleProgressChange = (progress: number | number[]) => {
    if (typeof progress != "number") {
      return;
    }
    setProgress(progress);
    if (audioRef.current) {
      const newTime = (progress / 100) * duration;
      audioRef.current.currentTime = newTime; // Update audio position
    }
  };

  const handleAudioEnd = () => {
    setAudioStatus("paused");
  };

  const resetAudio = () => {
    if (audioRef.current == null) {
      return;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  useEffect(() => {
    if (audioRef.current == null) {
      return;
    }
    if (audioStatus === "playing") {
      audioRef.current.play();
      return;
    }
    if (audioStatus === "paused") {
      audioRef.current.pause();
      return;
    }
  }, [audioStatus]);

  useEffect(() => {
    resetAudio();
    setAudioStatus("playing");
  }, [song]);

  return (
    <>
      <audio
        onEnded={handleAudioEnd}
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        src={song.songUrl}
      >
        Your browser does not support the audio element.
      </audio>
      <Slider
        aria-label="Music progress"
        classNames={{
          track: "bg-default-500/30",
          thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
        }}
        value={progress}
        onChange={handleProgressChange}
        color="foreground"
        defaultValue={33}
        size="sm"
      />
    </>
  );
};
