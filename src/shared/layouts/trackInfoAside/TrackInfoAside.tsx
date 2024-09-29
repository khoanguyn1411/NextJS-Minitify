"use client";

import { Card, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { useEffect, useMemo, useState, type FC } from "react";

import { getSongs, type ISong } from "@/core/apis/songApis";
import { BaseFilterParams } from "@/core/models/baseFilterParams";
import { AppImage } from "@/shared/components/AppImage";
import { SongBaseInfoView } from "@/shared/components/items-view/SongBaseInfoView";
import { usePlayingSong, type BelongTo } from "@/shared/hooks/usePlayingSong";

function shuffleArray<T>(array: readonly T[]): T[] {
  const shuffledArray = [...array]; // Create a copy of the array to avoid mutating the original array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Pick a random index from 0 to i
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
}

export const TrackInfoAside: FC = () => {
  const {
    playingSong,
    belongTo,
    setSongsToPlay,
    isShuffle,
    songsToPlay: originalSongsToPlayList,
    setPlayingSong,
  } = usePlayingSong();

  const [currentSongsToPlayList, setCurrentSongsToPlayList] = useState<
    readonly ISong[]
  >(originalSongsToPlayList);

  const shuffledList = useMemo(() => {
    return shuffleArray(originalSongsToPlayList);
  }, [originalSongsToPlayList]);

  const nextSongs = useMemo(() => {
    const currentSongIndex = currentSongsToPlayList.findIndex(
      (song) => song.id === playingSong?.id,
    );
    return currentSongsToPlayList.slice(currentSongIndex + 1);
  }, [playingSong, currentSongsToPlayList]);

  const handleSongClick = (song: ISong) => {
    setPlayingSong(song);
  };

  const setPlaylistSongToPlayByTurn = async (belongTo: BelongTo) => {
    if (belongTo?.type === "discover") {
      const songPages = await getSongs({
        ...BaseFilterParams.initialPagination,
        pageSize: 50,
        search: "",
      });
      setSongsToPlay(songPages.items);
    }
  };

  useEffect(() => {
    setPlaylistSongToPlayByTurn(belongTo);
  }, [belongTo]);

  useEffect(() => {
    if (isShuffle) {
      setCurrentSongsToPlayList(shuffledList);
      return;
    }
    setCurrentSongsToPlayList(originalSongsToPlayList);
  }, [isShuffle]);

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
