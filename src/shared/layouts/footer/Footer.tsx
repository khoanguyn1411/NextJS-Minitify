"use client";

import { Button } from "@nextui-org/button";
import { Slider } from "@nextui-org/react";
import { type FC } from "react";
import {
  BiArrowFromRight,
  BiArrowToRight,
  BiPauseCircle,
  BiRepeat,
  BiShuffle,
} from "react-icons/bi";

export const Footer: FC = () => {
  return (
    <div className="flex-col gap-2 grid grid-cols-3">
      <div>Test</div>
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
