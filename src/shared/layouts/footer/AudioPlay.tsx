import { Slider } from "@nextui-org/react";
import { useEffect, useRef, useState, type FC } from "react";

import { type ISong } from "@/core/apis/songApis";
import { getSrcFromApi } from "@/shared/utils/getSrcFromApi";

import { type AudioStatus, type VolumeSetting } from "./Footer";

type Props = {
  readonly song: ISong;
  readonly isRepeated: boolean;

  readonly audioStatus: AudioStatus;
  readonly setAudioStatus: (status: AudioStatus) => void;

  readonly duration: number;
  readonly setDuration: (time: number) => void;

  readonly currentTime: number;
  readonly setCurrentTime: (time: number) => void;

  readonly volume: VolumeSetting;
  readonly setVolume: (volume: VolumeSetting) => void;
};

export const AudioPlay: FC<Props> = ({
  song,
  audioStatus,
  isRepeated,
  setAudioStatus,
  setCurrentTime,
  duration,
  setDuration,
  volume,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);

  // When the audio is loaded, set the duration
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Update progress as the song plays
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const totalDuration = audioRef.current.duration;

      setProgress((currentTime / totalDuration) * 100); // Update progress percentage
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Function to seek the audio position when progress bar is clicked
  const handleProgressChange = (progress: number | number[]) => {
    if (typeof progress != "number") {
      return;
    }
    setProgress(progress);
  };

  const handleProgressChangeEnd = (newProgress: number | number[]) => {
    if (typeof newProgress != "number") {
      return;
    }
    if (audioRef.current) {
      const newTime = (newProgress / 100) * duration;
      audioRef.current.currentTime = newTime; // Update audio position
    }
  };

  const resetAudio = () => {
    if (audioRef.current == null) {
      return;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  const handleAudioEnd = () => {
    if (isRepeated) {
      resetAudio();
      return;
    }
    setAudioStatus("paused");
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

  useEffect(() => {
    if (audioRef.current == null) {
      return;
    }
    audioRef.current.volume = volume.current / 100;
  }, [volume]);

  return (
    <>
      <audio
        onEnded={handleAudioEnd}
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        src={getSrcFromApi(song.songUrl, "mp3")}
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
        onChangeEnd={handleProgressChangeEnd}
        color="foreground"
        size="sm"
      />
    </>
  );
};
