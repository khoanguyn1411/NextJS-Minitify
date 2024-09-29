"use client";

import { Card, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { type FC } from "react";

import { type ISong } from "@/core/apis/songApis";
import { AppImage } from "@/shared/components/AppImage";
import { SongBaseInfoView } from "@/shared/components/items-view/SongBaseInfoView";
import { usePlayingSong } from "@/shared/hooks/usePlayingSong";

export const TrackInfoAside: FC = () => {
  const { playingSong, nextSongs, setPlayingSong } = usePlayingSong();

  const handleSongClick = (song: ISong) => {
    setPlayingSong(song);
  };

  if (playingSong == null) {
    return (
      <div>
        <p>No song is playing.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <AppImage
        isBlurred
        classNames={{ wrapper: "!max-w-full", img: "w-full" }}
        alt={playingSong.name}
        src={playingSong.imageUrl}
      />
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold">{playingSong.name}</h1>
        <p>{playingSong.artists.map((artist) => artist.name).join(", ")}</p>
      </div>
      <Divider />
      {playingSong.artists.map((artist) => (
        <div key={artist.name}>
          <Card>
            <CardBody>
              <AppImage
                classNames={{ wrapper: "!max-w-full", img: "w-full" }}
                src={artist.imageUrl}
                alt={artist.name}
              />
            </CardBody>
            <CardFooter className="flex flex-col gap-2 items-start">
              <p className="font-bold">{artist.name}</p>
              <p className="truncate-3 text-xs">{artist.biography}</p>
            </CardFooter>
          </Card>
        </div>
      ))}
      <Divider />
      <div className="flex flex-col gap-4">
        <p className="font-bold">Playing</p>
        <SongBaseInfoView isSpinning song={playingSong} />
      </div>
      <Divider />
      <div className="flex flex-col gap-4">
        <p className="font-bold">Next songs</p>
        <Card className="flex flex-col max-h-[200px] overflow-auto justify-start">
          {nextSongs.map((song) => (
            <SongBaseInfoView
              onClick={handleSongClick}
              key={song.id}
              song={song}
            />
          ))}
        </Card>
      </div>
    </div>
  );
};
