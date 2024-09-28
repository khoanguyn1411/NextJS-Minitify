import { Button, Slider } from "@nextui-org/react";
import { type FC } from "react";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";

import { type VolumeSetting } from "./Footer";

type Props = {
  readonly volume: VolumeSetting;
  readonly setVolume: (volume: VolumeSetting) => void;
};

export const VolumeSettings: FC<Props> = ({ volume, setVolume }) => {
  const isMuted = volume.current === 0;

  const handleToggleVolume = () => {
    if (volume.current === 0) {
      setVolume({ prev: volume.prev, current: volume.prev });
      return;
    }
    setVolume({ prev: volume.prev, current: 0 });
  };

  const handleVolumeChange = (v: number | number[]) => {
    if (typeof v !== "number") {
      return;
    }
    setVolume({ prev: volume.prev, current: v });
  };

  const handleVolumeChangeEnd = (v: number | number[]) => {
    if (typeof v !== "number") {
      return;
    }
    if (v === 0) {
      return;
    }
    setVolume({ prev: v, current: volume.current });
  };

  return (
    <div className="w-1/3 flex gap-2 items-center">
      <Button
        onClick={handleToggleVolume}
        isIconOnly
        radius="full"
        variant="light"
      >
        {isMuted ? <BiVolumeMute /> : <BiVolumeFull />}
      </Button>
      <Slider
        aria-label="Music progress"
        classNames={{
          track: "bg-default-500/30",
          thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
        }}
        value={volume.current}
        onChange={handleVolumeChange}
        onChangeEnd={handleVolumeChangeEnd}
        color="foreground"
        size="sm"
      />
    </div>
  );
};
