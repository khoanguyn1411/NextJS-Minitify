"use client";

import { Button } from "@nextui-org/button";
import { Slider, User } from "@nextui-org/react";
import { useEffect, useState, type FC } from "react";
import {
  BiArrowFromRight,
  BiArrowToRight,
  BiPauseCircle,
  BiRepeat,
  BiShuffle,
} from "react-icons/bi";
import classNames from "classnames";

import { usePlayingSong } from "@/shared/hooks/usePlayingSong";

export const Footer: FC = () => {
  const { playingSong } = usePlayingSong();
  const [isSpinning, setIsSpinning] = useState(false);

  const handleResetSpinner = () => {
    setIsSpinning(false); // Stop the animation briefly to reset
    setTimeout(() => {
      setIsSpinning(true); // Restart the animation
    }, 0); // Use a timeout of 0 to restart the animation immediately
  };

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
          <p className="text-xs">1:23</p>
          <Slider
            aria-label="Music progress"
            classNames={{
              track: "bg-default-500/30",
              thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
            }}
            color="foreground"
            defaultValue={33}
            size="sm"
          />
          <p className="text-xs text-foreground/50">4:32</p>
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
            className="data-[hover]:bg-foreground/10"
            radius="full"
            variant="light"
          >
            <BiPauseCircle className="text-3xl" />
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
