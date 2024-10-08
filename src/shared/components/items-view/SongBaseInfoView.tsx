import { User } from "@nextui-org/react";
import classNames from "classnames";
import { type FC } from "react";

import { type ISong } from "@/core/apis/songApis";
import { getSrcFromApi } from "@/shared/utils/getSrcFromApi";

type Props = {
  readonly song: ISong;
  readonly isSpinning?: boolean;
  readonly onClick?: (song: ISong) => void;
};

export const SongBaseInfoView: FC<Props> = ({
  song,
  isSpinning = false,
  onClick,
}) => {
  return (
    <User
      onClick={() => onClick?.(song)}
      name={song.name}
      classNames={{
        base: classNames("", {
          "cursor-pointer hover:bg-input-hover p-2 mr-1": onClick != null,
        }),
      }}
      description={song.artists.map((artist) => artist.name).join(", ")}
      className="justify-start"
      avatarProps={{
        src: getSrcFromApi(song.imageUrl),
        className: classNames({
          "animate-spin": isSpinning,
        }),
      }}
    />
  );
};
