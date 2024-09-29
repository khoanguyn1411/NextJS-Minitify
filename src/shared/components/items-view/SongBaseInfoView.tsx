import { User } from "@nextui-org/react";
import classNames from "classnames";
import { type FC } from "react";

import { type ISong } from "@/core/apis/songApis";

type Props = {
  readonly song: ISong;
  readonly isSpinning?: boolean;
};

export const SongBaseInfoView: FC<Props> = ({ song, isSpinning = false }) => {
  return (
    <User
      name={song.name}
      description={song.artists.map((artist) => artist.name).join(", ")}
      avatarProps={{
        src: song.imageUrl,
        className: classNames(isSpinning ? "animate-spin" : ""),
      }}
    />
  );
};
