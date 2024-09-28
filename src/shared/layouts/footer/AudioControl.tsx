import { Button } from "@nextui-org/button";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import {
  BiPauseCircle,
  BiPlayCircle,
  BiRepeat,
  BiShuffle,
  BiSkipNext,
  BiSkipPrevious,
} from "react-icons/bi";
import { Tooltip } from "@nextui-org/react";

import { type ISong } from "@/core/apis/songApis";

import { AudioPlay } from "./AudioPlay";
import { type AudioStatus } from "./Footer";

type Props = {
  readonly song: ISong;

  readonly audioStatus: AudioStatus;
  readonly setAudioStatus: Dispatch<SetStateAction<AudioStatus>>;
};

export const AudioControl: FC<Props> = ({
  song,
  audioStatus,
  setAudioStatus,
}) => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRepeated, setIsRepeated] = useState(false);

  // Format time in mm:ss format
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const toggleAudioStatus = () => {
    setAudioStatus((status) => {
      if (status === "playing") {
        return "paused";
      }
      return "playing";
    });
  };

  const toggleRepeatedState = () => {
    setIsRepeated((prev) => !prev);
  };

  return (
    <div className="flex justify-center flex-col">
      <div className="flex items-center w-full gap-2">
        <p className="text-xs">{formatTime(currentTime)}</p>
        <AudioPlay
          audioStatus={audioStatus}
          song={song}
          isRepeated={isRepeated}
          setAudioStatus={setAudioStatus}
          duration={duration}
          setDuration={setDuration}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
        />
        <p className="text-xs">{formatTime(duration)}</p>
      </div>
      <div className="flex w-full h-full items-center justify-center">
        <Tooltip content={isRepeated ? "Not Repeat" : "Repeat"}>
          <Button
            isIconOnly
            className="data-[hover]:bg-foreground/10"
            radius="full"
            variant="light"
            color={isRepeated ? "primary" : "default"}
            onClick={toggleRepeatedState}
          >
            <BiRepeat className="text-lg" />
          </Button>
        </Tooltip>
        <Tooltip content="Previous">
          <Button
            isIconOnly
            className="data-[hover]:bg-foreground/10"
            radius="full"
            variant="light"
          >
            <BiSkipPrevious className="text-3xl" />
          </Button>
        </Tooltip>

        <Tooltip content={audioStatus === "paused" ? "Play" : "Pause"}>
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
        </Tooltip>

        <Tooltip content="Next">
          <Button
            isIconOnly
            className="data-[hover]:bg-foreground/10"
            radius="full"
            variant="light"
          >
            <BiSkipNext className="text-3xl" />
          </Button>
        </Tooltip>

        <Tooltip content="Shuffle">
          <Button
            isIconOnly
            className="data-[hover]:bg-foreground/10"
            radius="full"
            variant="light"
          >
            <BiShuffle className="text-lg" />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
